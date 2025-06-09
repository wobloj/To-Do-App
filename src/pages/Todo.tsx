import { Header } from "../components/Header"
import { TodoCreate } from "../components/TodoCreate"
import { List } from "../components/List"

export const Todo = () => {
  return (
    <div className="mx-20">
      <Header/>
      <div className="flex flex-row gap-10 h-[calc(100dvh-200px)] my-10">
        <List name="TODO"/>
        <TodoCreate/>
      </div>
    </div>
  )
}
