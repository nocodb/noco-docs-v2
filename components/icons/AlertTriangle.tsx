import * as React from "react"
import {SVGProps} from "react"

const AlertTriangle = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48"  height="21" fill="none" {...props}>
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path
                fill="#FA8231"
                stroke="#FA8231"
                d="M8.575 4.016 1.517 15.8a1.667 1.667 0 0 0 1.425 2.5h14.116a1.666 1.666 0 0 0 1.425-2.5L11.425 4.016a1.666 1.666 0 0 0-2.85 0Z"
            />
            <path stroke="#F9F9FA" d="M10 8.3v3.333M10 14.967h.008"/>
        </g>
    </svg>
)
export default AlertTriangle
