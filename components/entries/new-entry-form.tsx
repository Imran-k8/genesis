"use client";

import { useActionState } from "react";

import { createEntryAction } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBanner } from "@/components/ui/status-banner";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE } from "@/lib/validators";

export function NewEntryForm() {
  const [state, formAction] = useActionState(createEntryAction, EMPTY_ACTION_STATE);

  return (
    <Card className="rounded-[2rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Write an entry</CardTitle>
        <CardDescription>
          Titles are optional. The entry body is required and will be timestamped automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          {state.message ? <StatusBanner message={state.message} tone="error" /> : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="title">
              Title
            </label>
            <Input defaultValue={state.fields?.title ?? ""} id="title" name="title" placeholder="A quiet morning" />
            {state.errors?.title ? <p className="text-sm text-danger">{state.errors.title}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="content">
              Entry
            </label>
            <Textarea
              defaultValue={state.fields?.content ?? ""}
              id="content"
              name="content"
              placeholder="What happened today? What stood out? What do you want to remember?"
            />
            {state.errors?.content ? <p className="text-sm text-danger">{state.errors.content}</p> : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <SubmitButton className="w-full sm:w-auto" pendingLabel="Saving entry..." size="lg">
              Save entry
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
