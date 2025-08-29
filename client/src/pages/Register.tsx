import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useAuth } from "../hooks/useAuth"
import { Header } from "../components/Header"

export const Register = () => {
    const {register, user, logout} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
    const passwordValidation = () =>{
        if(password !== repeatPassword){
            alert("Passwords do not match");
            return false;
        }
        if(password.length < 6){
            alert("Password must be at least 6 characters long");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!passwordValidation()) return;
        try{
            await register(email, password);
            alert("Registered successfully");
        }catch(err){
            console.error(err);
            alert("Registration failed");
        }
    }

  return (
    <div className="mx-20">
        <Header/>
        {!user ? <div className="flex flex-col items-center justify-center h-full gap-4 mt-26">
            <h1 className="text-5xl font-semibold">Register</h1>
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
            <Input
                type="password"
                placeholder="Repeat Password"
                label="repeatPassword"
                title="Repeat Password"
                className="w-96 text-center"
                autoComplete="off"
                onChange={(e)=>setRepeatPassword(e.target.value)}
                />
            </div>
            <Button onClick={(handleSubmit)} type="submit">Register</Button>
        </div>:
        <div className="flex flex-col items-center justify-center h-full gap-4 mt-26">
            <h1 className="text-3xl font-semibold">You are logged in as {user.email}</h1>
            <Button onClick={logout} type="button">Logout</Button>
        </div>
        }
    </div>
  )
}
