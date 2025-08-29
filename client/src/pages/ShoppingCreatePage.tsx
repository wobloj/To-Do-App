import { Header } from "../components/Header"
import { ShoppingCreate } from "../components/ShoppingCreate"

export const ShoppingCreatePage = () => {
  return (
    <div className="mx-20">
            <Header/>
            <div className="flex flex-row gap-10 h-[calc(100dvh-200px)] my-10">
                <ShoppingCreate/>
            </div>
        </div>
  )
}
