import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AuthForm() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        try {
            e.preventDefault();
            console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { name, email, password });
            if(!response) {
                console.log("lkjhgf");
                return
            }
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            navigate("/login");
        } catch (error) {
            console.error("Signup failed", error);
        }
    }

    return (
        <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4">
            <div className="bg-[#111] text-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <div className="text-sm text-gray-400">⌘ BuddyCRM</div>
                    <h2 className="text-2xl font-semibold mt-3">Join us today</h2>
                    <p className="text-sm text-gray-400">Sign up with your Google account</p>
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

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full mt-1 px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
                            required
                        />
                    </div>
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
                        className="w-full bg-white text-black font-medium py-2 cursor-pointer rounded hover:bg-gray-200 transition"
                    >
                        SignUp
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-400">
                    {"Already have an account?"}{" "}
                    <Link to={"/login"} className="text-indigo-400 hover:underline">
                        Login
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
        </div>
    );
}
