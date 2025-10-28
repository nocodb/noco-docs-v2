import type { SVGProps } from "react";

const BaseOutlineLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)" stroke="currentColor" strokeWidth={1.33}>
      <path d="M15 12c0 .2-.182.32-.452.443l-5.555 2.53c-.558.254-1.462.254-2.02 0l-5.555-2.53C1.148 12.321 1 12.1 1 12M15 8c0 .2-.182.32-.452.443l-5.555 2.53c-.558.254-1.462.254-2.02 0l-5.555-2.53C1.148 8.321 1 8.1 1 8M1 4v8m14-8v8M14.548 4.64 8.993 7.17c-.557.253-1.462.253-2.02 0L1.418 4.64c-.557-.254-.557-.666 0-.92l5.555-2.53c.558-.254 1.463-.254 2.02 0l5.555 2.53c.558.254.558.666 0 .92Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h16v16H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
export default BaseOutlineLogo;
