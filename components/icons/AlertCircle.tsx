import * as React from "react"
import {SVGProps} from "react"

const AlertCircle = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" {...props}>
        <g
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            clipPath="url(#a)"
        >
            <path
                fill="#CB3F36"
                stroke="#CB3F36"
                d="M10 19.133a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667Z"
            />
            <path stroke="#fff" d="M10 14.133h.008M10 7.467V10.8"/>
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 .8h20v20H0z"/>
            </clipPath>
        </defs>
    </svg>
)
export default AlertCircle
