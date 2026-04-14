import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";

// This is a Server Component by default
async function getTodos(): Promise<Todo[]> {
  // Use 'no-store' to ensure we always get fresh data
  const res = await fetch("http://localhost:5000/api/todos", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>
      {/* Notice we don't pass fetchTodos anymore! */}
      <TodoForm />
      <TodoList todos={todos} />
    </main>
  );
}
