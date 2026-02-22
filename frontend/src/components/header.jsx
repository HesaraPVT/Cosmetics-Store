import { UserData } from "./userData";

export default function Header() { // H should be capitalized to be used as a component
    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="font-bold text-xl">Crystal Beauty Clear</h1>
            <p>Your beauty, our passion.</p>
            <UserData></UserData>
        </div>
    )
}