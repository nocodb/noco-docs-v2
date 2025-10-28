import type * as React from "react";
import { type IconNameType, iconMap } from "@/lib/iconMap";

type IconProps = {
  name: IconNameType;
  color?: string;
  ariaLabel?: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  color = "currentColor",
  ariaLabel,
  className,
  ...args
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      aria-label={ariaLabel}
      className={className}
      color={color}
      role={ariaLabel ? "img" : undefined}
      {...args}
    />
  );
};

export default Icon;
