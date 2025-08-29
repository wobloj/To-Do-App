import { Button } from "../components/Button"
import { Input } from "../components/Input"
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Divider } from "@mui/material";
import { Header } from "../components/Header";

export const Login = () => {
    const {login, logout, user} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await login(email, password);
            alert("Logged in successfully");
        }catch(err){
            console.error(err);
            alert("Login failed");
        }
    }

  return (
    <div className="mx-20">
        <Header/>
        {!user ? <div className="flex flex-col items-center justify-center h-full gap-4 mt-26">
            <h1 className="text-5xl font-semibold">Login</h1>
            <div className="mt-20 flex flex-col items-center gap-4">
            <Input
                type="email"
                placeholder="Email"
                label="email"
                title="Email"
                className="w-96 text-center"
                onChange={(e)=>setEmail(e.target.value)}
                />
            <Input
                type="password"
                placeholder="Password"
                label="password"
                title="Password"
                className="w-96 text-center"
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleSubmit} type="submit">Login</Button>
            <div className="mt-10 w-1/3">
                <div className="text-center mb-5">
                    You don't have an account? <br/> <a href="/register" className="text-orange-500 hover:underline cursor-pointer">Register Now!</a>
                </div>
                <Divider>
                    OR
                </Divider>
                <p className="text-center text-xl my-5">Login with</p>
                <div className="flex flex-row items-center justify-around gap-4 mt-2">
                    <a href="http://localhost:4000/auth/google" className="flex flex-row items-center gap-2 cursor-pointer hover:text-orange-500">
                        <GoogleIcon fontSize="large"/>
                        Google
                    </a>
                    <a href="http://localhost:4000/auth/github" className="flex flex-row items-center gap-2 cursor-pointer hover:text-orange-500">
                        <GitHubIcon fontSize="large"/>
                        GitHub
                    </a>
                </div>
            </div>
        </div>:
        <div className="flex flex-col items-center justify-center h-full gap-4 mt-26">
            <h1 className="text-3xl font-semibold">You are logged in as {user.email}</h1>
            <Button onClick={logout} type="button">Logout</Button>
        </div>}
    </div>
  )
}
