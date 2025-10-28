import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
    >
      <path d="M14 9.333H9.333V14H14V9.333ZM6.667 9.333H2V14h4.667V9.333ZM14 2H9.333v4.667H14V2ZM6.667 2H2v4.667h4.667V2Z" />
    </g>
  </svg>
);
export default SvgComponent;
