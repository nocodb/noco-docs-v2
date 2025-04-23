import * as React from "react"
import {SVGProps} from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
        <g clipPath="url(#clip0_8_31570)">
            <path
                d="M9.99984 19.1331C14.6022 19.1331 18.3332 15.4021 18.3332 10.7998C18.3332 6.19739 14.6022 2.46643 9.99984 2.46643C5.39746 2.46643 1.6665 6.19739 1.6665 10.7998C1.6665 15.4021 5.39746 19.1331 9.99984 19.1331Z"
                fill="#3366FF" stroke="#3366FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 14.1331V10.7998" stroke="white" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M10 7.46655H10.0083" stroke="white" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_8_31570">
                <rect width="20" height="20" fill="white" transform="translate(0 0.799805)"/>
            </clipPath>
        </defs>
    </svg>
)
export default SvgComponent
