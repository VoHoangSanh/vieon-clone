import Input from "../components/input";
import axios from "axios";

import {useCallback, useState } from "react";
const Auth = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login')
    const tongleVariant = useCallback(() =>{

        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')    
    }, []);
    const register = useCallback(async()=>{
        try{
            await axios.post('/api/register',{
               email,
               name,
               password 
            });
        
        }catch(error){
            console.log(error);
        }


    },[]);
    return (
        <div className="relative h-full w-full bg-[url('/images/1.png')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/VieOn.webp" alt="logo"  className="h-12"/>
                </nav>
                <div className="flex justify-center">
                <div style={{ backgroundColor: 'rgba(34, 34, 34, 1)' }} className="px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                           {variant == 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' &&(
                                <Input
                                lable="Username"
                                onChange={(ev: any) => setName(ev.target.value)}
                                id="name"
                                type="name"
                                value={name}
                              />
                                
                            )}
                          <Input
                            lable="Email"
                            onChange={(ev: any) => setEmail(ev.target.value)}
                            id="email"
                            type="email"
                            value={email}
                          />
                           <Input
                            lable="Password"
                            onChange={(ev: any) => setPassword(ev.target.value)}
                            id="password"
                            type="password"
                            value={password}
                          />
                        </div>
                        <button className="bg-green-600 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition
                        ">
                            {variant == 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant == 'login' ? 'First time using VieOn?' :'Already have an account'}
                            <span onClick={tongleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                            {variant == 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
