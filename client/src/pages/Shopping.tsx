import { Header } from "../components/Header"
import { List } from "../components/List"
import { ShoppingList } from "../components/ShoppingList"

export const Shopping = () => {
  return (
    <div className="mx-20">
        <Header/>
        <div className="flex flex-row gap-10 h-[calc(100dvh-200px)] my-10">
          <List name="Shopping List"/>
          <div className="flex flex-col justify-start items-center w-full p-10">
            <ShoppingList/>
          </div>
        </div>
    </div>
  )
}
