"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const router = useRouter();

  // Define types for id (string) and completed (boolean)
  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        completed: !completed,
      });
      router.refresh(); // Tells the Server Component (page.tsx) to re-fetch data
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center p-2 border rounded"
        >
          <span
            onClick={() => handleToggle(todo._id, todo.completed)}
            className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
          >
            {todo.task}
          </span>
          <button
            onClick={() => handleDelete(todo._id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
