"use client";

// "use client" means this component runs in the browser.
// We need this because it tracks state (edit mode on/off) that changes on click.

import { useState } from "react";
import { updateNote, deleteNote } from "./actions";

// This is a TypeScript type — a description of the shape of a note object.
// It tells TypeScript exactly what fields a note has and what types they are.
type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
};

export default function NoteCard({ note }: { note: Note }) {
  // isEditing: tracks whether this note is currently showing the edit form
  const [isEditing, setIsEditing] = useState(false);

  // These hold the current values of the inputs while editing
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  async function handleSave() {
    // Call the server action with the updated values
    await updateNote(note.id, title, body);
    // Switch back to view mode after saving
    setIsEditing(false);
  }

  // If in edit mode, show input fields
  if (isEditing) {
    return (
      <li className="border rounded p-4 space-y-2">
        <input
          value={title}
          // onChange fires on every keystroke — updates the title state
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 text-lg font-semibold"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-black text-white px-3 py-1 rounded text-sm"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="border px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  // If not in edit mode, show the note with a clickable title and delete button
  return (
    <li className="border rounded p-4">
      <div className="flex items-start justify-between gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-lg font-semibold hover:underline text-left"
        >
          {title}
        </button>
        <button
          onClick={() => deleteNote(note.id)}
          className="text-sm text-red-500 hover:text-red-700 shrink-0"
        >
          Delete
        </button>
      </div>
      <p className="text-gray-700 mt-1">{body}</p>
    </li>
  );
}
