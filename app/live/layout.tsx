import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Stream",
  description:
    "Watch live services from Celestial Church of Christ, Calgary Model Parish.",
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
