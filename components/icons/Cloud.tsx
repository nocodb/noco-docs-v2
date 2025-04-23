import * as React from "react"
import {SVGProps} from "react"

const Cloud = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <g clipPath="url(#a)">
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.333}
                d="M12 6.667h-.84A5.334 5.334 0 1 0 6 13.333h6a3.333 3.333 0 0 0 0-6.666Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z"/>
            </clipPath>
        </defs>
    </svg>
)
export default Cloud
