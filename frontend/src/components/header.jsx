import { Link } from "react-router-dom";
import { UserData } from "./userData";

export default function Header() { // H should be capitalized to be used as a component
    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="font-bold text-xl">Crystal Beauty Clear</h1>
            <p>Your beauty, our passion.</p>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
            <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</Link>
            <Link to="https://www.google.com" className="bg-purple-500 text-white px-4 py-2 rounded">Google</Link>
        </div>
    )
}