import { changelogSource } from "@/lib/source"
import { redirect } from "next/navigation"

export default function ChangeLog() {
    const last = changelogSource.getPages();

    const latest = last[last.length - 1];

    redirect(latest.url);
}