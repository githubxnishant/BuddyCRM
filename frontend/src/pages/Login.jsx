import React, { useState } from "react";
import axios from "axios";
import { Copy, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useTimer } from "../context/TimerContext";

export default function AuthForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { saveAuthToken } = useTimer();

    const handleLogin = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Verifiying...");
        try {
            if (!captchaToken) {
                return toast.update(toastId, {
                    render: 'Captcha is required!',
                    type: 'warning',
                    isLoading: false,
                    autoClose: 2000,
                })
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                email: email,
                password: password,
            }, { headers: { 'Content-Type': 'application/json' } });
            if (response.data.success) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.update(toastId, {
                    render: 'Redirecting to Dashboard!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                })
                await new Promise(resolve => setTimeout(resolve, 2000));
                localStorage.setItem("authToken", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response.status == 404) {
                console.error("User not found, redirecting to signup", error);
                await new Promise(resolve => setTimeout(resolve, 2000));
                toast.update(toastId, {
                    render: 'User not found, please signup!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
                await new Promise(resolve => setTimeout(resolve, 2000));
                return navigate("/signup");
            }
            if (error.response.status == 406) {
                console.log("Invalid credentials!");
                toast.update(toastId, {
                    render: 'Invalid credentials, please try again!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            console.error("Error signing in, please try again!", error);
            toast.error("Error signing in, please try again!");
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        const toastId = toast.loading("Verifying...");
        try {
            const userObject = jwtDecode(credentialResponse.credential);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google-login`, {
                email: userObject.email,
            }, { headers: { "Content-Type": "application/json" } });
            const { token } = response.data;
            await new Promise(resolve => setTimeout(resolve, 2000));
            localStorage.setItem('authToken', token);
            saveAuthToken(token);
            toast.update(toastId, {
                render: 'Redirecting to Dashboard!',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
            })
            navigate("/dashboard");
        } catch (error) {
            if (error.response.status == 404) {
                console.error("User not found, redirecting to signup", error);
                toast.update(toastId, {
                    render: 'User not found, please signup!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
                await new Promise(resolve => setTimeout(resolve, 2000));
                return navigate("/signup");
            }
            console.error("Error signing you up with Google:", error);
            toast.error("Error signing you up with Google!");
        }
    }

    return (
        <>
            <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 1.00, x: 0, y: -100 }}
                    animate={{ opacity: 1, scale: 1.00, x: 0, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-[#111] text-white w-full max-w-md p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-6">
                        <Link to={'/'}>
                            <div className="text-sm text-gray-400">⌘ BuddyCRM</div>
                        </Link>
                        <h2 className="text-2xl font-semibold mt-3">Welcome back</h2>
                        <p className="text-sm text-gray-400">Login with your Google account</p>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-transparent  text-white rounded mb-3">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <button className="w-full flex items-center justify-center gap-2 bg-transparent  text-white rounded mb-3">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                    </svg> */}
                        <GoogleLogin
                            onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse)}
                            onError={() => console.log('Login Failed')} />
                    </button>

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
                                {!showPassword ?
                                    <p value={showPassword} onClick={() => setShowPassword(!showPassword)} className="text-indigo-400 text-xs hover:underline">
                                        Show Password
                                    </p> :
                                    <p value={showPassword} onClick={() => setShowPassword(!showPassword)} className="text-indigo-400 text-xs hover:underline">
                                        Hide Password
                                    </p>}
                            </label>
                            {showPassword ?
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full mt-1 px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
                                    required
                                /> :
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full mt-1 px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
                                    required
                                />
                            }
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
                </motion.div>
                <DemoCredentials />
            </div >
        </>
    );
}

const DemoCredentials = () => {

    const demoEmail = "demo@buddycrm.com";
    const demoPassword = "demoPass@123";

    const [showInfo, setShowInfo] = useState(false)

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.info(`Copied ${text}`);
        setShowInfo(!showInfo);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 1.00, x: 0, y: 100 }}
                animate={{ opacity: 1, scale: 1.00, x: 0, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                popoverTarget="popup"
                onClick={(e) => setShowInfo(!showInfo)}
                className="fixed bg-[#111] bottom-5 right-5 cursor-pointer border p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#e5e7eb" viewBox="0 0 16 16">
                    <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0" />
                </svg>
            </motion.div>
            {showInfo && <motion.div
                initial={{ opacity: 0, scale: 1.00 }}
                animate={{ opacity: 1, scale: 1.00 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="bg-[#111] fixed right-5 bottom-20 transition-all duration-1000 text-white p-4 rounded shadow-md w-60 max-w-md mx-auto mt-4 space-y-4"
                id="popup"
                popover>
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
            </motion.div>}
        </>
    );
};