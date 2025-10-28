import type { SVGProps } from "react";

const AlertCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" width="24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      clipPath="url(#a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path
        d="M10 19.133a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667Z"
        fill="#CB3F36"
        stroke="#CB3F36"
      />
      <path d="M10 14.133h.008M10 7.467V10.8" stroke="#fff" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 .8h20v20H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
export default AlertCircle;
