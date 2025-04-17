import React, { useState } from "react";
import axios from "axios";
import { BadgeInfo, BadgeInfoIcon, Copy, Info, InfoIcon, LucideBadgeInfo, LucideInfo, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                params: {
                    "email": email,
                    "password": password,
                }
            })
            const { token } = response.data;
            localStorage.setItem("authToken", token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Failed", error)
        }
    }

    return (
        <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4">
            <div className="bg-[#111] text-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <div className="text-sm text-gray-400">⌘ BuddyCRM</div>
                    <h2 className="text-2xl font-semibold mt-3">Welcome back</h2>
                    <p className="text-sm text-gray-400">Login with your Google account</p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-600 text-white px-4 py-2 rounded mb-3 transition-all duration-300 hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                    </svg> Login with Google (under dev)
                </button>
                {/* <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-600 text-white px-4 py-2 rounded mb-6 hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16">
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                    </svg> Login with Google
                </button> */}

                <div className="text-center text-gray-500 text-xs mb-4">Or continue with</div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="m@example.com"
                            className="w-full mt-1 px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm flex justify-between">
                            Password
                            <a href="#" className="text-indigo-400 text-xs hover:underline">
                                Forgot your password?
                            </a>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full mt-1 px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white cursor-pointer text-black font-medium py-2 rounded hover:bg-gray-200 transition"
                    >
                        SignIn
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-400">
                    {"Don't have an account?"}{" "}
                    <Link to={"/signup"} className="text-indigo-400 hover:underline">
                        Signup
                    </Link>
                </p>

                {/* <p className="text-center text-[10px] mt-4 text-gray-500">
                    By clicking continue, you agree to our{" "}
                    <a href="#" className="underline">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline">
                        Privacy Policy
                    </a>
                    .
                </p> */}
            </div>
            <DemoCredentials />
        </div>
    );
}

const DemoCredentials = () => {

    const demoEmail = "demo@buddycrm.com";
    const demoPassword = "demoPass@123";

    const [showInfo, setShowInfo] = useState(false)

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <div onClick={(e) => setShowInfo(!showInfo)} className="fixed bg-[#111] bottom-5 right-5 cursor-pointer border p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#e5e7eb" viewBox="0 0 16 16">
                    <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0" />
                </svg>
            </div>
            {showInfo && <div className="bg-[#111] fixed right-5 bottom-20 transition-all duration-1000 text-white p-4 rounded shadow-md w-60 max-w-md mx-auto mt-4 space-y-4">
                <h2 className="text-lg font-semibold flex justify-between">Demo Credentials
                    <div className="cursor-pointer" onClick={(e) => { setShowInfo(!showInfo) }}><X /></div>
                </h2>

                <div className="flex items-center justify-between bg-zinc-800 p-3 rounded-md">
                    <div className="text-sm truncate">{demoEmail}</div>
                    <Copy
                        className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer"
                        onClick={() => copyToClipboard(demoEmail)}
                    />
                </div>

                <div className="flex items-center justify-between bg-zinc-800 p-3 rounded-md">
                    <div className="text-sm truncate">{demoPassword}</div>
                    <Copy
                        className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer"
                        onClick={() => copyToClipboard(demoPassword)}
                    />
                </div>
            </div>}
        </>
    );
};