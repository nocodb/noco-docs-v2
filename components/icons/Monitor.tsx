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
      <path d="M5.333 14h5.334M8 11.333V14M13.333 2H2.667c-.737 0-1.334.597-1.334 1.333V10c0 .736.597 1.333 1.334 1.333h10.666c.737 0 1.334-.597 1.334-1.333V3.333c0-.736-.597-1.333-1.334-1.333Z" />
    </g>
  </svg>
)
export default SvgComponent
