import { useNavigate } from "react-router-dom";

export function Signin() {
    let navigate = useNavigate();
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white w-96 rounded-md py-4 grid justify-center">
                <span className="font-bold text-4xl flex justify-center">Sign In</span>
                <span className="text-gray-500 mx-4 pt-4 text-lg text-center">Enter your credentials to access your account</span>
                <div className="pt-2 mt-2 grid mx-4">
                    <span className="text-black text-sm font-bold pb-2">Email</span>
                    <input className="border-2 rounded-md py-1 px-2" type="text" placeholder="johndoe@example.com" />
                </div>
                <div className="pt-2 grid mt-2 mx-4">
                    <span className="text-black text-sm font-bold pb-2">Password</span>
                    <input className="border-2 rounded-md py-1 px-2" type="text" />
                </div>
                <button className="bg-black text-white px-1 py-2 rounded-md mt-4 mx-4">Sign In</button>
                <span className="pt-2 flex justify-center">Don't have an account?
                    <button className="pl-1 underline" onClick={() => navigate('/signup')}>Sign Up</button></span>
            </div>
        </div>
    )
}
