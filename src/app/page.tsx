import { redirect } from "@/i18n/navigation";

export default function RootPage() {
  return redirect({ href: "/", locale: "en" });
}
