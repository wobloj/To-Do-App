import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <Link to={'/'}>
      <div className="flex flex-col text-center select-none cursor-pointer group">
          <h1 className="font-bold text-5xl transition-colors duration-300 group-hover:text-orange-500">DOIT</h1>
          <p>Keep in mind</p>
      </div>
    </Link>
  )
}
