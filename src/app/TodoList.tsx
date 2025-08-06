import { DeleteTodoCallback, ITodoItem, ITodoList, ToggleTodoCallback } from "./page";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
    todos: ITodoItem[];
    toggleTodo: ToggleTodoCallback;
    deleteTodo: DeleteTodoCallback;
}

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
    return (
        <ul className="flex flex-col space-y-2">
            {todos.map(todo => {
                return (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                );
            })}
        </ul>
    );
}