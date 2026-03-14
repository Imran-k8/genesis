"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/journal/new", label: "New Entry" },
  { href: "/profile", label: "Profile" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavigationProps = {
  mobile?: boolean;
};

export function Navigation({ mobile = false }: NavigationProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="fixed inset-x-4 bottom-4 z-20 rounded-full border border-border/80 bg-white/90 p-2 shadow-[0_24px_60px_-35px_rgba(24,44,37,0.45)] backdrop-blur lg:hidden">
        <ul className="grid grid-cols-3 gap-2">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  className={cn(
                    "flex h-12 items-center justify-center rounded-full text-sm font-medium",
                    active ? "bg-accent text-white" : "text-muted hover:bg-accent-soft/60 hover:text-foreground",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="space-y-2">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                className={cn(
                  "flex h-12 items-center rounded-2xl px-4 text-sm font-medium",
                  active
                    ? "bg-accent text-white shadow-[0_16px_30px_-18px_rgba(47,102,81,0.8)]"
                    : "text-muted hover:bg-white/75 hover:text-foreground",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
