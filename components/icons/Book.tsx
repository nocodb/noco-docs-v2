import * as React from "react"
import {SVGProps} from "react"

const Book = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.333}
        >
            <path d="M2.667 13a1.667 1.667 0 0 1 1.666-1.667h9"/>
            <path d="M4.333 1.333h9v13.334h-9A1.667 1.667 0 0 1 2.667 13V3a1.667 1.667 0 0 1 1.666-1.667v0Z"/>
        </g>
    </svg>
)
export default Book
