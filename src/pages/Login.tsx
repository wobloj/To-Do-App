import { Button } from "../components/Button"
import { Input } from "../components/Input"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';


export const Login = () => {
  return (
    <div className="h-screen">
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-5xl font-semibold">Login</h1>
            <div className="mt-20 flex flex-col items-center gap-4">
            <Input
                type="email"
                placeholder="Email"
                label="email"
                title="Email"
                className="w-96 text-center"
                />
            <Input
                type="password"
                placeholder="Password"
                label="password"
                title="Password"
                className="w-96 text-center"
                />
            </div>
            <Button type="submit">Login</Button>
            <div className="mt-10">
                <p className="text-center text-xl mb-5">Login with</p>
                <div className="flex flex-row gap-4 mt-2">
                    <Button className="flex flex-row items-center gap-2 cursor-pointer hover:text-orange-500" type="button">
                        <GoogleIcon fontSize="large"/>
                        Google
                    </Button>
                    <Button className="flex flex-row items-center gap-2 cursor-pointer hover:text-orange-500" type="button">
                        <FacebookIcon fontSize="large"/>
                        Facebook
                    </Button>
                    <Button className="flex flex-row items-center gap-2 cursor-pointer hover:text-orange-500" type="button">
                        <GitHubIcon fontSize="large"/>
                        GitHub
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
