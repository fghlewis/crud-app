# Notes App — Learning Project

A beginner-friendly CRUD (Create, Read, Update, Delete) notes app built step-by-step as a teaching exercise. The goal is understanding, not speed.

## What we're building

A single-page app where the user can:
- Type a note title and body into a form, click submit, and save it
- See a list of all notes below the form
- Click a note to edit it inline
- Click a delete button to remove it

No login, no complex styling, no extra libraries beyond the core stack.

## Stack

- **Next.js 16** (App Router) — full-stack framework, handles both frontend and backend
- **Supabase** — hosted PostgreSQL database
- **Drizzle ORM** — TypeScript-first database query tool and migration runner
- **TypeScript** — typed JavaScript, catches bugs before runtime
- **Tailwind CSS** — utility-class styling

## Rules for working with this user

- This user is a beginner. Explain before you do. Define jargon on first use.
- Go one step at a time. Stop after each step and wait for confirmation.
- If you hit an error, do not silently fix it — show the error, explain it, then fix it.
- No extra libraries. No Zod, no React Hook Form, no shadcn. Vanilla stack only.
- When creating or editing a file, walk through the 2-3 lines that matter most.
- Tell the user exactly what to open in their browser to test each change.

## Build steps and progress

- [x] 1. Set up the project skeleton (`create-next-app`)
- [x] 2. Install Drizzle (`drizzle-orm`, `drizzle-kit`, `postgres`)
- [x] 3. Folder tour
- [x] 4. Set up Supabase (user does this in browser — create project, get connection string)
- [x] 5. Create `.env.local` (explain environment variables and why secrets live here)
- [x] 6. Write the Drizzle schema (`db/schema.ts` — notes table with id, title, body, created_at)
- [x] 7. Generate and run the first migration (explain what a migration is, show the SQL)
- [x] 8. Create the database client (the file that connects Next.js to Supabase)
- [x] 9. Build the page — list view first (`app/notes/page.tsx`, server component, fetch from DB)
- [x] 10. Add the create form (explain server actions vs. the old way)
- [x] 11. Test end to end (create a note, check Supabase dashboard)
- [x] 12. Add edit (inline editing, introduces `useState` / `revalidatePath`)
- [x] 13. Add delete (delete button per note)
- [x] 14. Recap (study guide of every concept covered + 2-3 exercises to try solo)

## Next steps (solo exercises)

- [ ] **1. Sort notes newest first** — In `page.tsx`, change the query:
  ```typescript
  import { desc } from "drizzle-orm";
  const allNotes = await db.select().from(notes).orderBy(desc(notes.createdAt));
  ```
  New concept: `.orderBy()` and `desc()` in Drizzle. No schema or migration changes needed.

- [ ] **2. Show a note count above the list** — Add `<p>{allNotes.length} notes</p>` between the form and the list. Think about where `allNotes.length` is available and why.

- [ ] **3. Add a "pinned" checkbox to each note** — Touches every layer:
  - Add a `pinned` boolean column to `db/schema.ts`
  - Run `npm run db:generate` and `npm run db:migrate` to update the database
  - Add a checkbox to `NoteCard.tsx` that calls a new `togglePin` server action in `actions.ts`
  - Sort pinned notes to the top of the list

## Key file locations

- `db/schema.ts` — Drizzle table definitions
- `db/client.ts` — database connection
- `app/notes/page.tsx` — main notes page (server component)
- `.env.local` — secrets (not committed to git)
