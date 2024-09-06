import Head from "next/head";
import React, { useCallback, useState } from "react";
import { Todo } from "@/types/todo";
import AddTodoForm from "@/components/AddTodoForm"
import TodoList from "@/components/TodoList";
import Banner from "@/components/Banner";
import sampleData from "@/sampleData.json";

/*
 * Home: renders the To Do list page. Which is essentially a form component for creating To Dos and 3 todo lists
 * Each TodoList renders TodoItem components for each todo passed in
 * The 3 lists are for urgent, non-urgent, and completed
 * 
 * There are also several utility functions
 * 
 * AddTodo - create a new To Do
 * deleteTodo - delete a To Do via supplied id
 * toggleProperty - toggles isCompleted or isUrgent for supplied id
 * displayTodoList - renders the TodoList component
 * displayTodos - calls displayTodoList with a filtered To Do selection
 * displayComplete - calls displayTodoList with a filtered To Do selection
 */
export default function Home() {
  const getMaxId = (todoList?: Todo[]) => {
    if (typeof todoList === 'undefined')
      todoList = todos;

    if (!todoList.length)
      return 0;

    return todoList.reduce((prev, current) => {
      return (prev && prev.id > current.id) ? prev : current
    }).id;
  }

  const [todos, setTodos] = useState<Todo[]>(sampleData);
  const [maxId, setMaxId] = useState<number>(getMaxId);

  const AddTodo = (title: string, desc: string) => {
    const newTodo: Todo = {
      id: maxId + 1,
      title: title,
      description: desc,
      isCompleted: false,
      isUrgent: false,
    };

    setTodos([...todos, newTodo]);
    setMaxId(newTodo.id);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos);
    setMaxId(getMaxId(updatedTodos));
  };

  const toggleProperty = (id: number, property: keyof Pick<Todo, 'isCompleted' | 'isUrgent'>) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo[property] = !todo[property] as boolean;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const displayTodoList = (name: string, todoList: Todo[]) => {
    return (
      <TodoList
        name={name}
        todos={todoList}
        deleteTodo={deleteTodo}
        toggleComplete={(id) => toggleProperty(id, 'isCompleted')}
        toggleUrgent={(id) => toggleProperty(id, 'isUrgent')}
      />
    );
  };

  const displayTodos = (name: string, displayUrgent: boolean) => {
    return displayTodoList(name, todos.filter((x) => {
      return !x.isCompleted && (x.isUrgent === displayUrgent);
    }));
  };

  const displayComplete = (name: string) => {
    return displayTodoList(name, todos.filter((x) => x.isCompleted));
  };

  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="description" content="To Do List App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="Home">
        <Banner />
        <AddTodoForm addTodo={AddTodo}/>
        {displayTodos("Urgent", true)}
        {displayTodos("Not urgent", false)}
        {displayComplete("Complete")}
      </div>
    </>
  );
}
