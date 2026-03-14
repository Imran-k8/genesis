"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  EMPTY_ACTION_STATE,
  getTextField,
  validateAuthFields,
  validateJournalFields,
  type ActionState,
} from "@/lib/validators";

function buildMessageRedirect(pathname: string, message: string) {
  return `${pathname}?message=${encodeURIComponent(message)}`;
}

export async function loginAction(
  previousState: ActionState = EMPTY_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  void previousState;
  const email = getTextField(formData, "email").toLowerCase();
  const password = getTextField(formData, "password");
  const next = getTextField(formData, "next");

  const validation = validateAuthFields(email, password);

  if (validation) {
    return validation;
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      fields: { email, next },
      message: error.message,
    };
  }

  redirect(next || "/dashboard");
}

export async function signupAction(
  previousState: ActionState = EMPTY_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  void previousState;
  const email = getTextField(formData, "email").toLowerCase();
  const password = getTextField(formData, "password");

  const validation = validateAuthFields(email, password);

  if (validation) {
    return validation;
  }

  const supabase = await createServerSupabaseClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? "http://localhost:3000";
  const emailRedirectTo = `${origin}/auth/callback?next=/dashboard`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    return {
      fields: { email },
      message: error.message,
    };
  }

  if (!data.session) {
    redirect(
      buildMessageRedirect(
        "/login",
        "Account created. Check your email to confirm your sign-in if email confirmation is enabled.",
      ),
    );
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function createEntryAction(
  previousState: ActionState = EMPTY_ACTION_STATE,
  formData: FormData,
): Promise<ActionState> {
  void previousState;
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  const title = getTextField(formData, "title");
  const content = getTextField(formData, "content");

  const validation = validateJournalFields(title, content);

  if (validation) {
    return validation;
  }

  const { error } = await supabase.from("journal_entries").insert({
    user_id: user.id,
    title: title || null,
    content,
  });

  if (error) {
    return {
      fields: { title, content },
      message: "Unable to save your journal entry right now.",
    };
  }

  redirect(buildMessageRedirect("/dashboard", "Entry saved successfully."));
}

export async function deleteEntryAction(entryId: string) {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", user.id);

  if (error) {
    redirect(buildMessageRedirect(`/journal/${entryId}`, "Unable to delete that entry."));
  }

  redirect(buildMessageRedirect("/dashboard", "Entry deleted."));
}
