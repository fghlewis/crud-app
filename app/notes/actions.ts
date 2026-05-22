"use server";

// This file only contains server actions — functions that run on the server.
// The "use server" at the top applies to every function in this file.

import { db } from "@/db/client";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateNote(id: string, title: string, body: string) {
  // Update the row where the id matches, setting new title and body
  await db.update(notes).set({ title, body }).where(eq(notes.id, id));
  revalidatePath("/notes");
}
