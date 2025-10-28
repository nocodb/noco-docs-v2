import { redirect } from "next/navigation";
import { changelogSource } from "@/lib/source";

export default function ChangeLog() {
  const last = changelogSource.getPages();

  const latest = last.at(-1);

  if (!latest) {
    return redirect("/docs/product-docs");
  }

  redirect(latest.url);
}
