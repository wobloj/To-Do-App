import { FC } from "react";
import { ButtonLink } from "./ButtonLink";

interface ITodoType{
    type: string;
    desc: string;
    route?: string;
}

export const TodoType: FC<ITodoType> = ({type, desc, route}) => {
  return (
    <div className="px-20 py-10 w-4/12 flex flex-col items-center justify-between gap-5 border border-orange-200/50 shadow-md shadow-orange-200 rounded-xl">
        <h2 className="font-bold text-4xl text-orange-500">{type}</h2>
        <p className="text-xl text-center">{desc}</p>
        <ButtonLink to={route||'/'}>Create {type}</ButtonLink>
    </div>
  )
}
