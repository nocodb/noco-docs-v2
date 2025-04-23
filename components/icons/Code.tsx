import * as React from "react"
import {SVGProps} from "react"

const Code = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.333}
        >
            <path d="m10.667 12 4-4-4-4M5.333 4l-4 4 4 4"/>
        </g>
    </svg>
)
export default Code
