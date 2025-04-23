import * as React from "react";
import {iconMap, IconNameType} from "@/lib/iconMap";

interface IconProps {
    name: IconNameType;
    color?: string;
    ariaLabel?: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({name, color = "currentColor", ariaLabel, className, ...args}) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in iconMap`);
        return null;
    }

    return (
        <IconComponent
            color={color}
            aria-label={ariaLabel}
            className={className}
            role={ariaLabel ? "img" : undefined}
            {...args}
        />
    );
};

export default Icon;