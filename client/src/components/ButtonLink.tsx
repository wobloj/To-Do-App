import { FC, LinkHTMLAttributes } from "react"
import { Link } from "react-router-dom"

interface ILink extends LinkHTMLAttributes<HTMLLinkElement>{
    to:string |'/';
    children:React.ReactNode;
    className?:string;
}

export const ButtonLink:FC<ILink> = ({to, children, className}) => {
  return (
    <Link className={`cursor-pointer my-4 text-center font-bold rounded-2xl border-2 border-black self-center px-10 py-2 transition-colors hover:border-orange-500 hover:text-orange-500 ${className}`} to={to}>{children}</Link>
  )
}
