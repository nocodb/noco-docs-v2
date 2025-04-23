import * as React from "react"
import {SVGProps} from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.333}
        >
            <path d="M5.333 12H14M2 12h.007M5.333 8H14M2 8h.007M5.333 4H14M2 4h.007"/>
        </g>
    </svg>
)
export default SvgComponent
