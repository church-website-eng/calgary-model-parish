import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Church calendar and service schedule at CCC Calgary Model Parish, Calgary.",
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
