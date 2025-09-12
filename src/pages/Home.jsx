import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import BaseButton from "../components/BaseButton";
import Popup from "../components/Popup";
import BaseInput from "../components/BaseInput";
import { PlusIcon } from "lucide-react";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // ⬇ state loading
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      await ideas.add({ userId: user.current.$id, title, description });
      setTitle("");
      setDescription("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    try {
      await ideas.remove(id);
      setConfirmDelete(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      {user.current ? (
        <>
          <section className="max-w-[1080px] mx-auto mt-2 flex gap-2">
            <BaseButton onClick={() => setShowForm(true)} icon={<PlusIcon />}>
              New Idea
            </BaseButton>
          </section>

          <section className="mt-6 max-w-[1080px] mx-auto flex flex-col gap-4">
            <h2 className="text-2xl font-bold">My Ideas</h2>
            <ul className="grid grid-cols-3 gap-4">
              {ideas.current.length > 0 ? (
                ideas.current
                  .filter((idea) => idea.userId === user.current.$id)
                  .map((idea) => (
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
                  ))
              ) : (
                <p>No idea yet. Create your idea first.</p>
              )}
            </ul>
          </section>
        </>
      ) : (
        <section className="mt-2 max-w-[1080px] mx-auto p-4 shadow bg-white rounded flex flex-col gap-1">
          <p>Please login to submit an idea.</p>
        </section>
      )}

      {/* Popup Submit Idea */}
      <Popup
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="New Idea"
      >
        <div className="flex flex-col gap-3">
          <BaseInput
            type="text"
            label="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />

          <BaseInput
            type="text"
            label="Description"
            placeholder="Description"
            multiline={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <BaseButton variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </BaseButton>

            <BaseButton onClick={handleSubmit} disabled={loadingSubmit}>
              {loadingSubmit ? "Submitting..." : "Submit"}
            </BaseButton>
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
          <BaseButton
            variant="secondary"
            onClick={() => setConfirmDelete(null)}
          >
            Cancel
          </BaseButton>

          <BaseButton
            onClick={() => handleDelete(confirmDelete)}
            disabled={loadingDelete}
          >
            {loadingDelete ? "Deleting..." : "Delete"}
          </BaseButton>
        </div>
      </Popup>
    </>
  );
}
