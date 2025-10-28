"use client";
import { type UIMessage, type UseChatHelpers, useChat } from "@ai-sdk/react";
import { Presence } from "@radix-ui/react-presence";
import { DefaultChatTransport } from "ai";
import { Loader2, RefreshCw, SearchIcon, Send, X } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  type SyntheticEvent,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RemoveScroll } from "react-remove-scroll";
import { toast } from "sonner";
import { cn } from "../lib/cn";
import { Markdown } from "./markdown";
import { buttonVariants } from "./ui/button";

const Context = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  chat: UseChatHelpers<UIMessage>;
} | null>(null);

function useChatContext() {
  return use(Context)!.chat;
}

function SearchAIActions() {
  const { messages, status, setMessages, regenerate } = useChatContext();
  const isLoading = status === "streaming";

  if (messages.length === 0) {
    return null;
  }

  return (
    <>
      {!isLoading && messages.at(-1)?.role === "assistant" && (
        <button
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "gap-1.5 rounded-full",
            })
          )}
          onClick={() => regenerate()}
          type="button"
        >
          <RefreshCw className="size-4" />
          Retry
        </button>
      )}
      <button
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "sm",
            className: "rounded-full",
          })
        )}
        onClick={() => setMessages([])}
        type="button"
      >
        Clear Chat
      </button>
    </>
  );
}

function SearchAIInput(props: ComponentProps<"form">) {
  const { status, sendMessage, stop } = useChatContext();
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";
  const onStart = (e?: SyntheticEvent) => {
    e?.preventDefault();
    const clientId =
      typeof window !== "undefined"
        ? window.ncClientId || window.localStorage.getItem("nc_id")
        : null;
    void sendMessage(
      { text: input },
      {
        body: {
          clientId,
        },
      }
    );
    setInput("");
  };

  useEffect(() => {
    if (isLoading) {
      document.getElementById("nd-ai-input")?.focus();
    }
  }, [isLoading]);

  return (
    <form
      {...props}
      className={cn("flex items-start pe-2", props.className)}
      onSubmit={onStart}
    >
      <Input
        autoFocus
        className="p-4"
        disabled={status === "streaming" || status === "submitted"}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(event) => {
          if (!event.shiftKey && event.key === "Enter") {
            onStart(event);
          }
        }}
        placeholder={isLoading ? "AI is answering..." : "Ask AI"}
        value={input}
      />
      {isLoading ? (
        <button
          className={cn(
            buttonVariants({
              variant: "secondary",
              className: "mt-2 gap-2 rounded-full transition-all",
            })
          )}
          key="bn"
          onClick={stop}
          type="button"
        >
          <Loader2 className="size-4 animate-spin text-fd-muted-foreground" />
          Abort Answer
        </button>
      ) : (
        <button
          className={cn(
            buttonVariants({
              variant: "secondary",
              className: "!px-2.4 !rounded-full mt-2 transition-all",
            })
          )}
          disabled={input.length === 0}
          key="bn"
          type="submit"
        >
          <Send className="size-4" />
        </button>
      )}
    </form>
  );
}

function List(props: Omit<ComponentProps<"div">, "dir">) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    function callback() {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "instant",
      });
    }

    const observer = new ResizeObserver(callback);
    callback();

    const element = containerRef.current?.firstElementChild;

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn(
        "fd-scroll-container flex min-w-0 flex-col overflow-y-auto",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

function Input(props: ComponentProps<"textarea">) {
  const ref = useRef<HTMLDivElement>(null);
  const shared = cn("col-start-1 row-start-1", props.className);

  return (
    <div className="grid flex-1">
      <textarea
        id="nd-ai-input"
        {...props}
        className={cn(
          "resize-none bg-transparent placeholder:text-fd-muted-foreground focus-visible:outline-none",
          shared
        )}
      />
      <div className={cn(shared, "invisible break-all")} ref={ref}>
        {`${props.value?.toString() ?? ""}\n`}
      </div>
    </div>
  );
}

const roleName: Record<string, string> = {
  user: "You",
  assistant: "NocoDB Assistant",
};

function Message({
  message,
  ...props
}: { message: UIMessage } & ComponentProps<"div">) {
  let markdown = "";

  for (const part of message.parts ?? []) {
    if (part.type === "text") {
      markdown += part.text;
    }
  }

  return (
    <div {...props}>
      <p
        className={cn(
          "mb-1 font-medium text-fd-muted-foreground text-sm",
          message.role === "assistant" && "text-fd-primary"
        )}
      >
        {roleName[message.role] ?? "unknown"}
      </p>
      <div className="prose text-sm">
        <Markdown text={markdown} />
      </div>
    </div>
  );
}

export function AISearchTrigger() {
  const [open, setOpen] = useState(false);
  const chat = useChat({
    id: "search",
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (error) => {
      toast.error("Something went wrong! Please try again later");
      console.error(error);
    },
  });

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      e.preventDefault();
    }

    if (e.key === "/" && (e.metaKey || e.ctrlKey) && !open) {
      setOpen(true);
      e.preventDefault();
    }
  };

  const onKeyPressRef = useRef(onKeyPress);
  onKeyPressRef.current = onKeyPress;
  useEffect(() => {
    const listener = (e: KeyboardEvent) => onKeyPressRef.current(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  return (
    <Context value={useMemo(() => ({ chat, open, setOpen }), [chat, open])}>
      <RemoveScroll enabled={open}>
        <Presence present={open}>
          <div
            className={cn(
              "fixed inset-0 right-(--removed-body-scroll-bar-size,0) z-50 flex flex-col items-center bg-nc-background-default/90 p-2 pb-[8.375rem] backdrop-blur-sm",
              open ? "animate-fd-fade-in" : "animate-fd-fade-out"
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpen(false);
                e.preventDefault();
              }
            }}
          >
            <div className="sticky top-0 flex w-full max-w-[600px] items-center gap-2 py-2">
              <div className="flex-1" />
              <button
                className={cn(
                  "cursor-pointer rounded-full bg-nc-background-grey-light p-2 hover:bg-nc-background-grey-medium",
                  "border-1"
                )}
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>
            <List
              className="w-full overscroll-contain py-10 pr-2"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent, white 4rem, white calc(100% - 2rem), transparent 100%)",
              }}
            >
              <div className="mx-auto flex min-w-[600px] max-w-[600px] flex-col gap-4">
                {chat.messages
                  .filter((msg) => msg.role !== "system")
                  .map((item) => (
                    <Message key={item.id} message={item} />
                  ))}
              </div>
            </List>
          </div>
        </Presence>
        <div
          className={cn(
            "-translate-x-1/2 fixed bottom-2 z-50 cursor-pointer overflow-hidden rounded-2xl border shadow-xl transition-[width,height] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            open
              ? "h-32 w-[min(600px,90vw)] bg-nc-background-default"
              : "h-10 w-40 bg-nc-background-grey-medium text-fd-secondary-foreground shadow-fd-background"
          )}
          style={{
            left: "calc(50% - var(--removed-body-scroll-bar-size,0px)/2)",
          }}
        >
          <Presence present={!open}>
            <button
              className={cn(
                "absolute inset-0 p-2 text-center text-fd-muted-foreground text-sm transition-colors hover:bg-nc-background-grey-medium hover:text-fd-accent-foreground",
                open ? "animate-fd-fade-out bg-fd-accent" : "animate-fd-fade-in"
              )}
              onClick={() => setOpen(true)}
            >
              <SearchIcon className="-translate-y-1/2 absolute top-1/2 size-4.5" />
              Ask AI
            </button>
          </Presence>
          <Presence present={open}>
            <div
              className={cn(
                "absolute inset-0 flex flex-col",
                open ? "animate-fd-fade-in" : "animate-fd-fade-out"
              )}
            >
              <SearchAIInput className="flex-1" />
              <div className="flex items-center gap-1.5 p-1 empty:hidden">
                <SearchAIActions />
              </div>
            </div>
          </Presence>
        </div>
      </RemoveScroll>
    </Context>
  );
}
