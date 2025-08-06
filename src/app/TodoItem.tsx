import { useState } from "react";
import { DeleteTodoCallback, ITodoItem, ToggleTodoCallback } from "./page";
import { TrashIcon } from "@heroicons/react/24/solid";
import DeleteModal from "./DeleteModal";

interface TodoItemProps {
    todo: ITodoItem
    toggleTodo: ToggleTodoCallback;
    deleteTodo: DeleteTodoCallback;
}

export type CloseModalCallback = () => void;

export function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <li className="my-2 flex item-center">
            <button className=" mr-2 align-super bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-3 border border-black-500 hover:border-transparent rounded" onClick={openModal}>
                <TrashIcon className="size-6" />
            </button>
            < input className="w-9 h-9 " type="checkbox" name="completed" id="completed" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
            <label className={"mx-2 align-super text-lg" + (todo.completed ? " line-through" : "")}>{todo.title}</label>
            <DeleteModal open={isModalOpen} closeModal={closeModal} id={todo.id} deleteTodo={deleteTodo} />
        </li>

    );
}