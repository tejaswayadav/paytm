import { useNavigate } from "react-router-dom";

export function Signup() {
    let navigate = useNavigate();
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white w-96 rounded-md py-4 grid justify-center">
                <span className="font-bold text-4xl flex justify-center">Sign Up</span>
                <span className="text-gray-500 text-lg pt-4 px-6 text-center">Enter your information to create an account</span>
                <div className="pt-6 px-6 grid">
                    <span className="text-black text-sm font-bold pb-2">First name</span>
                    <input className="border-2 rounded-md py-1 px-2" type="text" placeholder="John" />
                </div>
                <div className="pt-2 px-6 mt-2 grid">
                    <span className="text-black text-sm font-bold pb-2">Last Name</span>
                    <input className="border-2 rounded-md py-1 px-2" type="text" placeholder="Doe" />
                </div>
                <div className="pt-2 px-6 mt-2 grid">
                    <span className="text-black text-sm font-bold pb-2">Email</span>
                    <input className="border-2 rounded-md py-1 px-2" type="text" placeholder="johndoe@example.com" />
                </div>
                <div className="pt-2 px-6 grid mt-2">
                    <span className="text-black text-sm font-bold pb-2">Password</span>
                    <input className="border-2 rounded-md py-1 px-2" type="text" />
                </div>
                <button className="bg-black text-white py-2 rounded-md mt-4 mx-6">Sign Up</button>
                <span className="pt-2 px-6 flex justify-center">Already have an account? <button className="pl-1 underline" onClick={() => navigate('/signin')}>Sign In</button></span>
            </div>
        </div>
    )
}
