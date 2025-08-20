import { Link } from "react-router-dom"
import LoginIcon from '@mui/icons-material/Login';

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
        <Link className="hover:text-orange-500 ml-8" to={"/login"}>
            <li>Login <LoginIcon/></li>
        </Link>
    </ul>
  )
}
