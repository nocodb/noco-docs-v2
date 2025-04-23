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
      <path d="M13.333 14v-3.333M11.333 10.667h4M2.667 14V9.333M.667 9.333h4M8 14V8M6 5.333h4M13.333 8V2M8 5.333V2M2.667 6.667V2" />
    </g>
  </svg>
)
export default SvgComponent
