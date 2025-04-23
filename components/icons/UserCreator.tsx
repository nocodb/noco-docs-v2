import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <g stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M8 7.333A2.667 2.667 0 1 0 8 2a2.667 2.667 0 0 0 0 5.333ZM6.667 10H5.332a2.667 2.667 0 0 0-2.667 2.667V14"
      />
      <path
        strokeWidth={1.33}
        d="M13 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M9 12.5h.625m4.375 0h-.625M12.75 14.665l-.313-.541m-2.187-3.79.313.542M12.75 10.335l-.313.541m-2.187 3.789.313-.541"
      />
    </g>
  </svg>
)
export default SvgComponent
