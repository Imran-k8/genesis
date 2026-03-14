import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { JournalEntry } from "@/types/database";
import { formatShortDate, formatTime, getSnippet } from "@/utils/date";

type EntryCardProps = {
  entry: JournalEntry;
};

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <Link className="block" href={`/journal/${entry.id}`}>
      <Card className="rounded-[1.75rem] transition-transform hover:-translate-y-0.5">
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl text-foreground">{entry.title || "Untitled reflection"}</h3>
              <p className="mt-1 text-sm text-muted">
                {formatShortDate(entry.created_at)} at {formatTime(entry.created_at)}
              </p>
            </div>
            <span className="inline-flex rounded-full border border-border/70 bg-white/65 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
              Journal entry
            </span>
          </div>
          <p className="text-sm leading-7 text-muted">{getSnippet(entry.content)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
