import type { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <mask
      height={16}
      id="a"
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
      width={16}
      x={0}
      y={0}
    >
      <path
        d="M.665.665h14.67v14.67H.665z"
        fill="#D9D9D9"
        stroke="currentColor"
        strokeWidth={1.33}
      />
    </mask>
    <g mask="url(#a)" stroke="currentColor" strokeWidth={1.33}>
      <rect height={4} rx={1} width={4} x={10} y={2} />
      <rect height={6} rx={1} width={4} x={2} y={2} />
      <rect height={4} rx={1} width={4} x={10} y={10} />
      <path d="M6 4h4M6 6h1a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h1m2-6v4" />
    </g>
  </svg>
);
export default SvgComponent;
