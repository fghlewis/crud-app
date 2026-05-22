import { db } from "@/db/client";
import { notes } from "@/db/schema";

// This is a server component — it runs on the server and can talk to the database.
// The "async" keyword lets us use "await" to wait for the database to respond.
export default async function NotesPage() {
  // Fetch every row from the notes table
  const allNotes = await db.select().from(notes);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>

      {/* If there are no notes, show a message. Otherwise, list them. */}
      {allNotes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-4">
          {allNotes.map((note) => (
            // "key" is required by React when rendering a list — it helps React
            // track which item is which when the list changes
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
