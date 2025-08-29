import { ShoppingListPreview } from "./ShoppingListPreview"
import { Add, DeleteForever } from "@mui/icons-material"
import { Button } from "./Button"

export const ShoppingList = () => {
  return (
    <>
        <h2 className="text-3xl">Shopping List Title</h2>
        <p>Biedronka</p>
        <div className="flex flex-col gap-4 w-[calc(100%-10rem)] mt-5 p-10">
            <ShoppingListPreview title="Test list" shop="Biedronka" items={[
                { name: "Chleb", quantity: 2 },
                { name: "Mleko", quantity: 1 },
                { name: "Jajka", quantity: 10 }
            ]}/>
        </div>
        <div className="flex flex-row gap-5">
            <Button className="hover:!text-green-600 hover:!border-green-600 flex flex-row items-center" type="button">
                <Add/>
                Add item to list
            </Button>
            <Button className="hover:!text-red-400 hover:!border-red-400 flex flex-row items-center" type="button">
                <DeleteForever/>
                Delete list
            </Button>
        </div>
    </>
  )
}
