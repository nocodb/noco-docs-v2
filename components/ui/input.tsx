import * as React from "react"

import {cn} from "@/lib/utils"

function Input({className, type, ...props}: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-nc-content-grey-muted shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08)] selection:bg-primary selection:text-nc-content-grey-muted bg-nc-background-default border-2 border-nc-border-grey-medium flex h-10.5 w-full min-w-0 rounded-lg px-4 py-2 text-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ant-primary-hover focus-visible:shadow-[0px_0px_0px_2px_var(--color-ant-primary-outline)]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
            {...props}
        />
    )
}

export {Input}
