import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-10.5 w-full min-w-0 rounded-lg border-2 border-nc-border-grey-medium bg-nc-background-default px-4 py-2 text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08)] outline-none transition-[color,box-shadow] selection:bg-primary selection:text-nc-content-grey-muted file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-nc-content-grey-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ant-primary-hover focus-visible:shadow-[0px_0px_0px_2px_var(--color-ant-primary-outline)]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
