import { useState } from "react";
import styles from "../styles/taskForm.module.css";

export default function TaskForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    await onSubmit(description);
    setDescription("");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="New task..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
