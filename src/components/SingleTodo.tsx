import { DeleteForever, Edit } from "@mui/icons-material"
import { Checkbox, Tooltip } from "@mui/material";
import { FC, useState } from "react";

interface ISingleTodo{
    text:string;
    deadline?:string;
}

export const SingleTodo:FC<ISingleTodo> = ({text, deadline}) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleCheckbox = (isChecked:boolean)=>{
        setIsCompleted(isChecked);
    }


  return (
    <div className="border-2 rounded-md flex flex-row items-center justify-between">
        <div className="m-4">
            <Tooltip title="Check if done">
                <Checkbox onChange={(e) =>{handleCheckbox(e.target.checked)}} color="warning"/>
            </Tooltip>
        </div>
        <div className="flex flex-col">
            <label className={isCompleted ? `line-through text-gray-400` : ""} htmlFor="task">{text}</label>
            <p className={isCompleted ? `line-through text-gray-400` : "text-gray-500"}>{deadline}</p>
        </div>
        <div className="m-4 flex flex-row gap-4">
            <Tooltip title="Delete">
                <DeleteForever className="cursor-pointer text-orange-500 hover:text-orange-300"/>
            </Tooltip>
            <Tooltip title="Edit">
                <Edit className="cursor-pointer text-orange-500 hover:text-orange-300"/>
            </Tooltip>
        </div>
    </div>
  )
}
