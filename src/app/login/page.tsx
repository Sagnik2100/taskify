"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage(){
    const router = useRouter();
    const [formData , setFormData] = useState({
        username:'',
        password:''
    });
    function handleChange(e){
        setFormData(
            {
                ...formData,
                [e.target.name]:e.target.value
            }
        )
    }
    async function HandleSubmit(e){
        e.preventDefault();
        // console.log(formData);
        const res = await fetch( "/api/login",{
            method: "POST",
            headers : {"content-type":"application/json"},
            body : JSON.stringify({email : formData.username,password:formData.password})
        });
        const data = await res.json();
        if(data[0].isValidated == 1){
            router.push("../tasks")
        }
    }
    return(
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
            <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl p-8">
                <form onSubmit= {HandleSubmit} className="p-6 bg-white shadow-md rounded">
                <label className="block mb-2">Enter Username</label>
                <input className= "border-2 border-solid" name="username" type="text" onChange={handleChange}></input>
                <label className="block mb-2" >Enter Password</label>
                <input className= "border-2 border-solid" name="password" type="password" onChange={handleChange}></input>
                 <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded mt-4">
                        Login
                 </button>
                </form>
            </div>
        </div>
    )
}