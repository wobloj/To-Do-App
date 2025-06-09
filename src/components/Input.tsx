import { InputHTMLAttributes, FC } from "react"


interface IInput extends InputHTMLAttributes<HTMLInputElement>{
    type:string;
    label:string;
    isLabel?:boolean|true;
    placeholder:string;
    title:string;
    className?:string;
    position?:"items-start"|"items-center"|"items-end";
}

export const Input:FC<IInput> = ({type, label, isLabel, placeholder, title, className, position, ...rest}) => {
  return (
    <div className={`flex flex-col ${position}`}>
      {isLabel && <label className="self-start font-extralight text-base" htmlFor={label}>{title}</label>}
      <input className={`text-xl px-3 pt-2 transition-colors outline-0 border-b-2 focus:border-orange-500 ${className}`} id={label} type={type} placeholder={placeholder} {...rest}/>
    </div>
  )
}
