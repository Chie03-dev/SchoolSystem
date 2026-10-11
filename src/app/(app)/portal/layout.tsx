import { PortalShell } from "@/components/portal/portal-shell";

export default function PortalLayout({ children }: LayoutProps<"/portal">) {
  return <PortalShell>{children}</PortalShell>;
}
