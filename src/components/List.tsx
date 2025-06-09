import { FC } from "react"

interface IList{
  name:string
}

export const List: FC<IList> = ({name}) => {
  return (
    <div className="border border-orange-200 rounded-md px-5 py-2 h-full w-64 ">
        <p className="text-center my-10 font-bold text-xl">{name}</p>
        <div className="text-center opacity-50">
            <p>Empty list</p>
            <p>Add new {name} to track your progress</p>
        </div>
    </div>
  )
}
