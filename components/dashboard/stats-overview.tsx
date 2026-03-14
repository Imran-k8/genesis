import { Card, CardContent } from "@/components/ui/card";
import { formatShortDate } from "@/utils/date";

type StatsOverviewProps = {
  latestEntryAt?: string;
  stats: {
    entriesThisWeek: number;
    totalEntries: number;
    totalWords: number;
  };
};

export function StatsOverview({ latestEntryAt, stats }: StatsOverviewProps) {
  const items = [
    {
      label: "Total entries",
      value: stats.totalEntries.toLocaleString(),
      note: "Everything saved to your private journal.",
    },
    {
      label: "Entries this week",
      value: stats.entriesThisWeek.toLocaleString(),
      note: "A quick view of your current writing pace.",
    },
    {
      label: "Words captured",
      value: stats.totalWords.toLocaleString(),
      note: latestEntryAt ? `Latest entry on ${formatShortDate(latestEntryAt)}.` : "Write your first entry today.",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="rounded-[1.75rem]">
          <CardContent className="space-y-3 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">{item.label}</p>
            <p className="font-serif text-4xl text-foreground">{item.value}</p>
            <p className="text-sm leading-6 text-muted">{item.note}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
