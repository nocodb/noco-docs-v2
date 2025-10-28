import { Scale } from "lucide-react";
import type { SVGProps } from "react";

export default function LegalIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return <Scale className={className} {...props} />;
}
