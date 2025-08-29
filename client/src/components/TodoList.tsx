import { Add, DeleteForever } from "@mui/icons-material"
import { Button } from "./Button"
import { SingleTodo } from "./SingleTodo"

export const TodoList = () => {
  return (
    <>
        <h2 className="text-3xl">Todo Tasks Title</h2>
        <div className="flex flex-col gap-4 w-[calc(100%-10rem)] h-full border border-orange-200 rounded-md mt-5 p-10 overflow-y-auto">
            <SingleTodo text={"Task1"}/>
            <SingleTodo text={"Task2"}/>
            <SingleTodo text={"Task3"}/>
        </div>
        <div className="flex flex-row gap-5">
            <Button className="hover:!text-green-600 hover:!border-green-600 flex flex-row items-center" type="button">
                <Add/>
                Add new task
            </Button>
            <Button className="hover:!text-red-400 hover:!border-red-400 flex flex-row items-center" type="button">
                <DeleteForever/>
                Delete list
            </Button>
        </div>
    </>
  )
}
