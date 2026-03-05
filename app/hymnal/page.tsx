import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import HymnalClient from "./HymnalClient";

export const metadata: Metadata = {
  title: "CCC Hymnal",
  description:
    "Browse the complete Celestial Church of Christ hymnal — Yoruba, English, and Tonic Solfa.",
};

interface Hymn {
  number: number;
  yoruba: string;
  english: string;
  solfa?: string;
}

export default async function HymnalPage() {
  let hymns: Hymn[] = [];

  // Try DB first
  try {
    const dbData = await getContent("hymnal", { hymns: [] } as { hymns: Hymn[] });
    if (dbData.hymns && dbData.hymns.length > 0) {
      hymns = dbData.hymns;
    }
  } catch {
    // DB unavailable, continue to file fallback
  }

  // Fall back to static JSON file
  if (hymns.length === 0) {
    try {
      const filePath = path.join(process.cwd(), "public", "data", "hymns.json");
      const raw = await fs.readFile(filePath, "utf-8");
      hymns = JSON.parse(raw);
    } catch {
      // File read failed
    }
  }

  return <HymnalClient initialHymns={hymns} />;
}
