import { Header } from "../components/Header"
import { TodoCreate } from "../components/TodoCreate"

export const TodoCreatePage = () => {
  return (
    <div className="mx-0 sm:mx-20">
        <Header/>
        <div className="flex flex-row gap-10 sm:h-[calc(100dvh-200px)] my-10">
            <TodoCreate/>
        </div>
    </div>
  )
}
