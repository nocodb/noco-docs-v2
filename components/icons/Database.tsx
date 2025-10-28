import type { SVGProps } from "react";

const Database = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
    >
      <path d="M14 8c0 1.107-2.667 2-6 2s-6-.893-6-2M8 5.333c3.314 0 6-.895 6-2 0-1.104-2.686-2-6-2s-6 .896-6 2c0 1.105 2.686 2 6 2Z" />
      <path d="M2 3.333v9.334c0 1.106 2.667 2 6 2s6-.894 6-2V3.333" />
    </g>
  </svg>
);
export default Database;
