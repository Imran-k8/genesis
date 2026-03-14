import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteEntryAction } from "@/app/actions";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBanner } from "@/components/ui/status-banner";
import { getJournalEntry } from "@/lib/journal";
import { formatLongDateTime } from "@/utils/date";

type JournalDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function JournalDetailPage({ params, searchParams }: JournalDetailPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const entry = await getJournalEntry(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Entry detail</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">
            {entry.title || "Untitled reflection"}
          </h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link className={buttonVariants({ variant: "secondary" })} href="/dashboard">
            Back to dashboard
          </Link>
          <form action={deleteEntryAction.bind(null, entry.id)}>
            <button className={buttonVariants({ variant: "destructive" })} type="submit">
              Delete entry
            </button>
          </form>
        </div>
      </div>

      {query.message ? <StatusBanner message={query.message} tone="error" /> : null}

      <Card className="rounded-[2rem]">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-white/60 p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Created</p>
              <p className="mt-2 text-sm text-foreground">{formatLongDateTime(entry.created_at)}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Updated</p>
              <p className="mt-2 text-sm text-foreground">{formatLongDateTime(entry.updated_at)}</p>
            </div>
          </div>
          <article className="rounded-[1.5rem] border border-border/70 bg-surface-strong/80 p-5">
            <div className="whitespace-pre-wrap text-base leading-8 text-foreground">{entry.content}</div>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
