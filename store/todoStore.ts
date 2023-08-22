import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "@/lib/mmkv";
import { Todo } from "@/types/todo";

export interface TodoState {
	todos: Todo[];
	addTodo: (todo: Todo) => void;
	toggleCompletion: (id: string) => void;
	removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
	persist(
		(set) => ({
			todos: [],
			addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
			toggleCompletion: (id) =>
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id ? { ...todo, completed: !todo.completed } : todo,
					),
				})),

			removeTodo: (id) =>
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				})),
		}),
		{
			name: "todo-storage",
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
