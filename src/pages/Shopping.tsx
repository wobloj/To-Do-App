import { Header } from "../components/Header"
import { List } from "../components/List"
import { ShoppingCreate } from "../components/ShoppingCreate"

export const Shopping = () => {
  return (
    <div className="mx-20">
        <Header/>
        <div className="flex flex-row gap-10 h-[calc(100dvh-200px)] my-10">
          <List name="Shopping List"/>
          <ShoppingCreate/>
        </div>
    </div>
  )
}
