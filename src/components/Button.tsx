import {ButtonHTMLAttributes, FC} from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    type:"submit" | "reset" | "button" | undefined;
    children:React.ReactNode;
    disabled?:boolean | false;
}

export const Button: FC<IButton> = ({type, disabled, children, ...rest}) => {
  return (
    <button className="cursor-pointer my-4 text-center font-normal rounded-2xl border-[1px] border-black self-center px-10 py-2 transition-colors hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-default disabled:text-black disabled:border-black" type={type} disabled={disabled} {...rest}>{children}</button>
  )
}
