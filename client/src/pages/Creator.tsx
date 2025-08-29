import { Header } from "../components/Header"
import { TodoType } from "../components/TodoType"

export const Creator = () => {
  return (
    <div className="mx-20">
        <Header/>
        <div className="mt-20 mb-32">
            <h2 className="text-5xl text-center">Welcome in <span className="text-orange-500 font-semibold">DOIT</span> Creator!</h2>
            <p className="text-xl font-light text-center">Select type of list and start tracking!</p>
        </div>
        <div className="flex flex-row justify-center gap-20">
            <TodoType route="/todo/create" type="To do list" desc="Create your to do list and track everything with possibility to create deadlines and reminders."/>
            <TodoType route="/shopping/create" type="Shopping list" desc="Create your shopping list with possibility to select which shop you want to buy and sharing system."/>
        </div>
    </div>
  )
}
