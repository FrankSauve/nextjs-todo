'use client'

import { useEffect, useState } from "react";
import { Form } from "./Form";
import { TodoList } from "./TodoList";
import { UUID } from "crypto";
import Header from "./Header";
import DeleteAllModal from "./DeleteAllModal";


export interface ITodoItem {
  id: UUID;
  title: string;
  completed: boolean;
}

export interface ITodoList {
  todos: ITodoItem[];
}

export type ToggleTodoCallback = (id: UUID, completed: boolean) => void;
export type AddTodoCallback = (title: string) => void;
export type DeleteTodoCallback = (id: UUID) => void;
export type DeleteAllCallback = () => void;

export default function Home() {

  const [todoList, setTodoList] = useState<ITodoList>(() => {
    const localValue = localStorage.getItem("TODOS");
    if (localValue == null) return { todos: [] };

    return JSON.parse(localValue);
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todoList))
  }, [todoList])

  const toggleTodo: ToggleTodoCallback = (id, completed) => {
    setTodoList(currentTodoList => ({
      todos: currentTodoList.todos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    }));
  }

  const addTodo: AddTodoCallback = (title) => {
    setTodoList(currentTodoList => ({
      todos: [...currentTodoList.todos, { id: crypto.randomUUID() as UUID, title: title, completed: false }]
    }));
  }

  const deleteTodo: DeleteTodoCallback = (id) => {
    setTodoList(currentTodoList => ({
      todos: currentTodoList.todos.filter(todo => todo.id !== id)
    }))
  }

  const deleteAll = () => {
    setTodoList(() => ({
      todos: []
    }))
  }

  const openModal = () => {
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setIsOpenModal(false);
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen items-center m-12">
        <div>
          <Form onSubmit={addTodo} />
          <button className="my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full" onClick={openModal}>
            Delete All
          </button>
          <DeleteAllModal open={isOpenModal} closeModal={closeModal} deleteAll={deleteAll} />
          <TodoList todos={todoList.todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </div>
      </div >
    </div>
  );
}
