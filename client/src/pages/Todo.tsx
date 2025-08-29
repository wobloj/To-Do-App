import { Header } from "../components/Header"
import { List } from "../components/List"
import { TodoList } from "../components/TodoList"

export const Todo = () => {
  return (
    <div className="mx-20">
      <Header/>
      <div className="flex flex-row gap-10 h-[calc(100dvh-200px)] my-10">
        <List name="TODO"/>
        <div className="flex flex-col justify-start items-center w-full p-10">
          <TodoList/>
        </div>
      </div>
    </div>
  )
}
