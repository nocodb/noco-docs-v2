import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
    >
      <path d="M3.57 15a3.106 3.106 0 0 1 0-4.392l.55-.55" />
      <path d="m5.492 2.098 6.588 6.588-2.47 2.47a3.105 3.105 0 0 1-4.393 0L3.021 8.962a3.106 3.106 0 0 1 0-4.392l2.47-2.47ZM13.178 4.294l-2.47 2.47M9.884 1l-2.47 2.47" />
    </g>
  </svg>
);
export default SvgComponent;
