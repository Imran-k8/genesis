"use client";

import { EntryCard } from "@/components/entries/entry-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { useJournalSearch } from "@/hooks/use-journal-search";
import type { JournalEntry } from "@/types/database";

type EntriesListProps = {
  entries: JournalEntry[];
};

export function EntriesList({ entries }: EntriesListProps) {
  const { filteredEntries, hasQuery, query, setQuery } = useJournalSearch(entries);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-border/70 bg-white/55 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Your entries</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {entries.length === 0
              ? "Start your archive with the first private journal entry."
              : `Search across ${entries.length} saved ${entries.length === 1 ? "entry" : "entries"}.`}
          </p>
        </div>
        <div className="w-full sm:max-w-sm">
          <Input
            aria-label="Search journal entries"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title or content"
            value={query}
          />
        </div>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          actionHref="/journal/new"
          actionLabel="Write your first entry"
          description="Once you save a journal entry it will appear here in reverse chronological order."
          title="No journal entries yet"
        />
      ) : filteredEntries.length === 0 ? (
        <EmptyState
          actionHref="/dashboard"
          actionLabel="Clear search"
          description="Try a different word or phrase. Search checks both the entry title and content."
          title={hasQuery ? "No entries match your search" : "No entries found"}
        />
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <EntryCard entry={entry} key={entry.id} />
          ))}
        </div>
      )}
    </section>
  );
}
