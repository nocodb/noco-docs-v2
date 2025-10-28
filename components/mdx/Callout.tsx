import Icon from "@/components/ui/Icon";
import type { IconNameType } from "@/lib/iconMap";

type Props = {
  type?: "info" | "warn" | "error" | "note" | "tip";
  children: React.ReactNode;
};

const iconMap = {
  info: "info",
  warn: "alertTriangle",
  error: "alertCircle",
  note: "info",
  tip: "info",
};

export function Callout(params: Props) {
  let { type } = params;

  if (!type) {
    type = "info";
  }

  return (
    <div className="callout my-2">
      <div className="flex gap-4 rounded-xl border-1 border-nc-border-grey-medium p-4">
        <Icon
          className="text-transparent"
          name={iconMap[type] as IconNameType}
        />
        <div className="callout-content">{params?.children}</div>
      </div>
    </div>
  );
}
