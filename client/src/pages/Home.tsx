import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"

export const Home = () => {
  return (
    <div className="mx-10 md:mx-20">
        <Header/>
        <Hero/>
        <Footer/>
    </div>
  )
}
