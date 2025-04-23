import Icon from "@/components/ui/Icon";
import {IconNameType} from "@/lib/iconMap";

interface Props {
    type?: 'info' | 'warn' | 'error' | 'note' | 'tip';
    children: React.ReactNode;
}

const iconMap = {
    info: "info",
    warn: "alertTriangle",
    error: "alertCircle",
    note: "info",
    tip: "info",
};

export function Callout(params: Props) {

    let {type} = params

    if (!type) {
        type = 'info'
    }


    return (
        <div className="my-2 callout">
            <div className="p-4 rounded-xl  border-1 flex gap-4 border-nc-border-grey-medium">
                <Icon width="30" className="text-transparent" name={iconMap[type] as IconNameType}/>
                <div className="callout-content">
                    {params?.children}
                </div>
            </div>
        </div>
    )
        ;
}