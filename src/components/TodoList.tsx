import React from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    name: string;
    todos: Todo[];
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
    toggleUrgent: (id: number) => void;
}

/*
 * TodoList: Create a ul element and render a TodoItem element for each todo supplied
 */
function TodoList({ name, todos, deleteTodo, toggleComplete, toggleUrgent }: TodoListProps) {
    return (
        <ul>
            <h2>{name}</h2>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    toggleUrgent={toggleUrgent}
                />
            ))}
        </ul>
    );
}

export default TodoList;