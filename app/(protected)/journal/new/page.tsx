import { NewEntryForm } from "@/components/entries/new-entry-form";

export default function NewEntryPage() {
  return (
    <div className="page-enter space-y-6">
      <section className="soft-panel rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-muted">New entry</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Capture what matters today.</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Add a short title if it helps you organize your thoughts, then write the entry itself. Content is
          required and will be saved privately to your account.
        </p>
      </section>

      <NewEntryForm />
    </div>
  );
}
