import { SingleTodo } from "./SingleTodo"
import { FC } from "react";

export interface ITodoListPreview {
  title: string;
  todos: { text: string; deadline?: string }[];
}
export const TodoListPreview:FC<ITodoListPreview> = ({title, todos}) => {
  return (
    <>
      <h3 className="font-semibold text-2xl mb-4">{title}</h3>
      <div className="flex flex-col gap-4 w-[calc(100%-20rem)] mb-10 max-h-70 overflow-y-scroll">
        {todos.map((todo, index) => (
          <SingleTodo key={index} text={todo.text} deadline={todo.deadline}/>
        ))}
      </div>
    </>
  )
}
