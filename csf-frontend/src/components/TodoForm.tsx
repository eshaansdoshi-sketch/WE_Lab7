"use client";
import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TodoForm = () => {
  const [task, setTask] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      await axios.post("/api/todos", { task });
      setTask("");
      router.refresh(); // Refresh the list without needing a prop
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default TodoForm;