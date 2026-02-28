import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacraments",
  description:
    "Request sacraments at CCC Calgary Model Parish — baptism, naming, harvest thanksgiving, and more.",
};

export default function SacramentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
