import { useState } from "react";

export default function TestPage() {
    const [count, setCount] = useState(0);
    return ( // justify-center is used to center the content horizontally, and items-center is used to center the content vertically
        <div className="w-full h-screen bg-red-400 flex justify-center items-center">
            <div className="w-[250px] h-[250px] bg-green-400 shadow-lg rounded-lg flex justify-center items-center gap-4">
                <button onClick={()=>{
                    setCount(count - 1);
                }} className="bg-blue-500 text-white font-bold px-4 py-2 rounded cursor-pointer">-</button>
                <span className="text-[20px] font-bold">{count}</span>
                <button onClick={()=>{
                    setCount(count + 1);
                }} className="bg-blue-500 text-white font-bold px-4 py-2 rounded cursor-pointer">+</button>
            </div>
            </div>
    )
}