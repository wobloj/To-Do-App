import { FC, useState } from "react"
import { ElementInList } from "./ElementInList"
import { Button } from "./Button"
import { Add } from "@mui/icons-material"
import { Link } from "react-router-dom"

interface IList{
  name:string
}

export const List: FC<IList> = ({name}) => {
  const [isEmpty] = useState(false)


  return (
    <div className="flex flex-col items-center justify-between h-full border border-orange-200 rounded-md px-5 py-2 w-72">
      <div className=" flex flex-col justify-start items-center">
          <p className="my-10 font-bold text-xl">{name}</p>
          {isEmpty &&
          <div className="opacity-50">
              <p>Empty list</p>
              <p>Add new {name} to track your progress</p>
          </div>}
          {!isEmpty &&
          <>
            <ElementInList/>
            <ElementInList/>
            <ElementInList/>
          </>
          }
          
      </div>
      <Link to={'/todo/create'}>
        <Button type="button" className="mb-10">
          <Add/>
          Add new list
        </Button>
      </Link>
    </div>
  )
}
