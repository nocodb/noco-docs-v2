import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
    >
      <path d="M15.333 14v-1.333a2.667 2.667 0 0 0-2-2.58M11.333 14v-1.333A2.667 2.667 0 0 0 8.667 10H3.333a2.667 2.667 0 0 0-2.666 2.667V14M10.667 2.087a2.666 2.666 0 0 1 0 5.166M6 7.333A2.667 2.667 0 1 0 6 2a2.667 2.667 0 0 0 0 5.333Z" />
    </g>
  </svg>
)
export default SvgComponent
