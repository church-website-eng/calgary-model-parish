import Hero from "@/components/home/Hero";
import ServiceCountdown from "@/components/home/ServiceCountdown";
import Stats from "@/components/home/Stats";
import CharacterOfWeek from "@/components/home/CharacterOfWeek";
import ServiceTimes from "@/components/home/ServiceTimes";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import LatestSermon from "@/components/home/LatestSermon";
import Newsletter from "@/components/home/Newsletter";
import Divider from "@/components/ui/Divider";
import { getEvents, getSermons } from "@/lib/contentful";
import { getContent } from "@/lib/content";
import { defaultChurchInfo, defaultServiceTimes, defaultStats } from "@/data/defaults";

export default async function Home() {
  const [events, contentfulSermons, churchInfo, serviceTimes, stats, dbSermons] = await Promise.all([
    getEvents(3),
    getSermons(1),
    getContent("church_info", defaultChurchInfo),
    getContent("service_times", defaultServiceTimes),
    getContent("stats", defaultStats),
    getContent("sermons", { sermons: [] } as { sermons: { id: string; title: string; speaker: string; date: string; series?: string; slug: string; videoUrl?: string }[] }),
  ]);

  // Use DB sermons first, then Contentful
  const latestSermon = dbSermons.sermons.length > 0
    ? dbSermons.sermons[0]
    : contentfulSermons[0] || null;

  // If DB stats are empty or all zeros, fall back to defaults
  const validStats =
    stats.items && stats.items.length > 0 && stats.items.some((s: { value: number }) => s.value > 0)
      ? stats.items
      : defaultStats.items;

  return (
    <>
      <Hero churchInfo={churchInfo} />
      <ServiceCountdown />
      <Stats items={validStats} />
      <Divider />
      <CharacterOfWeek />
      <Divider />
      <ServiceTimes data={serviceTimes} />
      <Divider />
      <UpcomingEvents events={events} />
      <Divider />
      <LatestSermon sermon={latestSermon} />
      <Divider />
      <Newsletter />
    </>
  );
}
