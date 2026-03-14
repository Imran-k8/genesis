import Link from "next/link";

import { EntriesList } from "@/components/dashboard/entries-list";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { buttonVariants } from "@/components/ui/button";
import { StatusBanner } from "@/components/ui/status-banner";
import { getJournalEntries, getJournalStats } from "@/lib/journal";

type DashboardPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const [entries, stats] = await Promise.all([getJournalEntries(), getJournalStats()]);

  return (
    <div className="page-enter space-y-6">
      <section className="soft-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">Dashboard</p>
            <h1 className="font-serif text-4xl leading-tight text-balance text-foreground sm:text-5xl">
              Your recent reflections, all in one place.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted">
              Review your archive, search through past notes, and keep a steady journaling habit.
            </p>
          </div>
          <Link className={buttonVariants({ size: "lg" })} href="/journal/new">
            New entry
          </Link>
        </div>
        {params.message ? <StatusBanner className="mt-5" message={params.message} tone="success" /> : null}
      </section>

      <StatsOverview latestEntryAt={entries[0]?.created_at} stats={stats} />

      <EntriesList entries={entries} />
    </div>
  );
}
