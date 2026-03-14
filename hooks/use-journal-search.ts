"use client";

import { useDeferredValue, useState } from "react";

import type { JournalEntry } from "@/types/database";

export function useJournalSearch(entries: JournalEntry[]) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredEntries = normalizedQuery
    ? entries.filter((entry) => {
        const title = entry.title?.toLowerCase() ?? "";
        const content = entry.content.toLowerCase();

        return title.includes(normalizedQuery) || content.includes(normalizedQuery);
      })
    : entries;

  return {
    filteredEntries,
    hasQuery: normalizedQuery.length > 0,
    query,
    setQuery,
  };
}
