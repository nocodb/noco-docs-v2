import * as React from "react"
import {SVGProps} from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <mask
            id="a"
            width={16}
            height={16}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
            style={{
                maskType: "alpha",
            }}
        >
            <path
                fill="#D9D9D9"
                stroke="currentColor"
                strokeWidth={1.33}
                d="M.665.665h14.67v14.67H.665z"
            />
        </mask>
        <g stroke="currentColor" strokeWidth={1.33} mask="url(#a)">
            <rect width={4} height={4} x={10} y={2} rx={1}/>
            <rect width={4} height={6} x={2} y={2} rx={1}/>
            <rect width={4} height={4} x={10} y={10} rx={1}/>
            <path d="M6 4h4M6 6h1a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h1m2-6v4"/>
        </g>
    </svg>
)
export default SvgComponent
