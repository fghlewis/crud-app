import { db } from "@/db/client";
import { notes } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function NotesPage() {
  // Server action — this function runs on the SERVER when the form is submitted.
  // "use server" is the instruction that makes this happen.
  async function createNote(formData: FormData) {
    "use server";

    // FormData is a built-in object that holds the submitted form fields.
    // .get("title") retrieves the value of the input with name="title".
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    // Insert a new row into the notes table
    await db.insert(notes).values({ title, body });

    // Tell Next.js the data at /notes is now stale — re-fetch it
    revalidatePath("/notes");
  }

  // Fetch all notes to display in the list below the form
  const allNotes = await db.select().from(notes);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>

      {/* The form — action points to our server action function */}
      <form action={createNote} className="mb-8 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Note title"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-1">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={4}
            placeholder="Write your note..."
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Save note
        </button>
      </form>

      {/* Notes list */}
      {allNotes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-4">
          {allNotes.map((note) => (
            <li key={note.id} className="border rounded p-4">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-gray-700 mt-1">{note.body}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
