import {Logo} from './Logo'
import {Navbar} from './Navbar'

export const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center my-4 h-20">
        <Logo/>
        <Navbar/>
    </div>
  )
}
