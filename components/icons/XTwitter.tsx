export default function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g id="Logo Icons">
                <rect width="16" height="16" rx="2" fill="black"/>
                <path id="Vector"
                      d="M9.14162 7.19268L13.6088 2H12.5502L8.67144 6.50886L5.57339 2H2L6.68472 8.81811L2 14.2637H3.0586L7.15466 9.50193L10.4266 14.2637H14L9.14113 7.19268H9.14162ZM7.69157 8.8782L7.21696 8.19928L3.44 2.79689H5.06616L8.11417 7.15663L8.58878 7.83554L12.5507 13.5028H10.9245L7.69157 8.8782Z"
                      fill="white"/>
            </g>
        </svg>

    )
}