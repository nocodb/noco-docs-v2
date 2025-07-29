import { SVGProps } from "react";
import { Scale } from "lucide-react";

export default function LegalIcon({
                                      className,
                                      ...props
                                  }: SVGProps<SVGSVGElement>) {
    return <Scale className={className} {...props} />;
}