import { MouseEventHandler, useState } from "react";
import { AddTodoCallback, ITodoItem } from "./page"

interface FormProps {
    onSubmit: AddTodoCallback
}

export function Form({ onSubmit }: FormProps) {

    const [newTodoTitle, setNewTodoTitle] = useState<string>("")

    function handleSubmit(e: any) {
        e.preventDefault();
        onSubmit(newTodoTitle);

        setNewTodoTitle("");
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setNewTodoTitle(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="w-150 hover:bg-gray-100 text-gray-800 font-semibold mt-8 py-2 px-4 border border-gray-400 rounded shadow"
                placeholder="New Todo..." value={newTodoTitle} onChange={handleInputChange}></input>
            <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full" onClick={handleSubmit}>
                Add
            </button>
        </form>
    )
}