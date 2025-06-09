import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <ul className="flex felx-row gap-10 text-xl">
        <Link className="hover:text-orange-500" to={"/creator"}>
            <li>Creator</li>
        </Link>
        <Link className="hover:text-orange-500" to={"/todo"}>
            <li>To do</li>
        </Link>
        <Link className="hover:text-orange-500" to={"/shopping"}>
            <li>Shopping list</li>
        </Link>
    </ul>
  )
}
