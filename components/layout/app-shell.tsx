import Link from "next/link";
import type { ReactNode } from "react";

import { logoutAction } from "@/app/actions";
import { Navigation } from "@/components/layout/navigation";
import { buttonVariants } from "@/components/ui/button";
import { formatShortDate } from "@/utils/date";

type AppShellProps = {
  children: ReactNode;
  userCreatedAt: string;
  userEmail: string;
};

export function AppShell({ children, userCreatedAt, userEmail }: AppShellProps) {
  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl gap-6">
        <aside className="glass-panel hidden w-80 flex-col rounded-[2rem] p-6 lg:flex">
          <div>
            <p className="font-serif text-3xl italic text-accent-strong">Quiet Journal</p>
            <p className="mt-3 text-sm leading-7 text-muted">
              A calm space for your private daily notes. Everything here is scoped to your account.
            </p>
          </div>

          <div className="mt-8">
            <Navigation />
          </div>

          <div className="mt-auto space-y-4 rounded-[1.75rem] border border-border/70 bg-white/55 p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-muted">Account</p>
              <p className="mt-3 text-sm font-medium text-foreground">{userEmail}</p>
              <p className="mt-1 text-sm text-muted">Member since {formatShortDate(userCreatedAt)}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link className={buttonVariants({ size: "lg" })} href="/journal/new">
                Write now
              </Link>
              <form action={logoutAction}>
                <button className={buttonVariants({ className: "w-full", variant: "secondary" })} type="submit">
                  Log out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0">
          <header className="glass-panel page-enter rounded-[2rem] p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Today</p>
                <h1 className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">
                  {formatShortDate(new Date().toISOString())}
                </h1>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-white/60 px-4 py-3 text-sm text-muted">
                Signed in as <span className="font-medium text-foreground">{userEmail}</span>
              </div>
            </div>
          </header>

          <main className="mt-6 flex-1">{children}</main>
        </div>
      </div>
      <Navigation mobile />
    </div>
  );
}
