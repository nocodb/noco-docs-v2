import * as React from "react"
import { SVGProps } from "react"

const Sparkle = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.333}
        >
            {/* Brain-like AI outline */}
            <path d="M4 8a4 4 0 1 1 8 0 4 4 0 1 1-8 0Z" />
            <path d="M8 4v1.333M8 10.667V12M4.934 5.267l.933.933M11.066 5.267l-.933.933M4.934 10.733l.933-.933M11.066 10.733l-.933-.933" />

            {/* Sparkle */}
            <path d="M14 2.667l.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4.4-1.2Z" />
        </g>
    </svg>
)

export default Sparkle
