import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import BaseButton from "../components/BaseButton";
import Popup from "../components/Popup";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSubmit = async () => {
    try {
      await ideas.add({ userId: user.current.$id, title, description });
      setTitle("");
      setDescription("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {user.current ? (
        <section className="max-w-[1080px] mx-auto mt-2">
          <BaseButton onClick={() => setShowForm(true)}>+ New Idea</BaseButton>
        </section>
      ) : (
        <section className="mt-2 max-w-[1080px] mx-auto p-4 shadow bg-white rounded flex flex-col gap-1">
          <p>Please login to submit an idea.</p>
        </section>
      )}

      <section className="mt-6 max-w-[1080px] mx-auto flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Latest Ideas</h2>
        <ul className="grid grid-cols-3 gap-4">
          {ideas.current.map((idea) => (
            <li
              key={idea.$id}
              className="p-4 shadow bg-white rounded flex flex-col gap-2"
            >
              <strong>{idea.title}</strong>
              <p>{idea.description}</p>

              {user.current && user.current.$id === idea.userId && (
                <BaseButton
                  variant="secondary"
                  onClick={() => setConfirmDelete(idea.$id)}
                >
                  Remove
                </BaseButton>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Popup Submit Idea */}
      <Popup isOpen={showForm} onClose={() => setShowForm(false)} title="New Idea">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded h-24 resize-none"
          />
          <div className="flex justify-end gap-2">
            <BaseButton variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </BaseButton>

            <BaseButton onClick={handleSubmit}>Submit</BaseButton>
          </div>
        </div>
      </Popup>

      {/* Popup Confirm Delete */}
      <Popup
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this idea?</p>

        <div className="mt-4 flex justify-end gap-2">
          <BaseButton variant="secondary" onClick={() => setConfirmDelete(null)}>
            Cancel
          </BaseButton>

          <BaseButton
            onClick={() => {
              ideas.remove(confirmDelete);
              setConfirmDelete(null);
            }}
          >
            Delete
          </BaseButton>
        </div>
      </Popup>
    </>
  );
}
