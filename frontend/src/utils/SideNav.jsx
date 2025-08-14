import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    BookOpen,
    Users,
    LifeBuoy,
    Send,
    Settings,
} from "lucide-react";

export default function Sidebar() {
    const [platformOpen, setPlatformOpen] = useState(true);
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/fetch/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
                localStorage.removeItem("authToken");
                navigate("/login");
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 300)
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="md:w-[15vw] w-[65vw] md:ml-0 ml-5 h-screen md:bg-[#18181b] text-white flex flex-col justify-between py-5 md:z-0 z-10r">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <Link to={'/'}>
                        <div className="flex items-center gap-3">
                            <div className=" flex justify-center items-start scale-200">⌘</div>
                            {/* <div className="bg-blue-600 flex justify-center h-8 w-8 rounded-md text-white font-bold text-xl">⌘</div> */}
                            <div>
                                <p className=" flex justify-center items-center text-lg font-semibold">BuddyCRM</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Platform Section */}
                <div className="text-xs uppercase w-full flex justify-start px-2 text-gray-400 mb-2">Quick Nav</div>


                <Link to={'/dashboard'}><div onClick={() => setActiveTab("dashboard")} className={`flex transition-all duration-300 items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 ${window.location.href === `${import.meta.env.VITE_FRONTEND_URL}/dashboard` ? "bg-zinc-700" : ""} cursor-pointer`}>
                    <LayoutDashboard size={16} />
                    Dashboard
                </div></Link>

                <Link to={'/transactions'}><div onClick={() => setActiveTab("explore")} className={`flex transition-all duration-300 items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 ${window.location.href === `${import.meta.env.VITE_FRONTEND_URL}/transactions` ? "bg-zinc-700" : ""} cursor-pointer`}>
                    <Users size={16} />
                    {/* <span>Explore</span> */}
                    Transactions
                </div></Link>

                {/* Projects Section */}
                <div className="mt-6">
                    <div className="text-xs uppercase text-gray-400 mb-2">Features (Under Dev)</div>
                    <div className="space-y-1">
                        <Link to={'/interactions'}>
                            <div onClick={() => setActiveTab("interactions")} className={`flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer duration-300 transition-all ${window.location.href === `${import.meta.env.VITE_FRONTEND_URL}/interactions` ? "bg-zinc-700" : ""}`}>
                                <Send size={16} />
                                <span>Interactions</span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setPlatformOpen(!platformOpen)}
                            className="flex items-center justify-between w-full text-sm px-2 py-1.5 rounded hover:bg-zinc-800"
                        >
                            <div className="flex items-center gap-2">
                                <LayoutDashboard size={16} />
                                <span>Playground</span>
                            </div>
                            {platformOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>

                        {platformOpen && (
                            <div className="ml-6 space-y-1 transition-all duration-500 border-l px-2">
                                <div className="text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">Settlements</div>
                                <div className="text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">Priorities</div>
                                <div className="text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">Visualize</div>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                            <BookOpen size={16} />
                            <span>Schedules</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                            <Settings size={16} />
                            <span>Settings</span>
                        </div>

                        {/* <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                            <MoreHorizontal size={16} />
                            <span>More</span>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                    <LifeBuoy size={16} />
                    <span>Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                    <Send size={16} />
                    <span>Feedback</span>
                </div>

                {/* User */}
                <div className="flex items-center justify-between mt-2 bg-zinc-800 px-3 py-2 rounded-lg">
                    <div className="flex w-full items-center justify-between gap-2">
                        {/* <img
                            src="https://github.com/shadcn.png"
                            alt="user"
                            className="w-7 h-7 rounded-full"
                        /> */}
                        <div className="flex gap-2 items-center justify-center">
                            {!isLoading
                                ? <>
                                    <div className="bg-indigo-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg">
                                        {user.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </>
                                : <>
                                    <div className="bg-zinc-400 rounded-full w-7 h-7 flex items-center justify-center animate-pulse"></div>
                                    <div>
                                        <div className="bg-zinc-400 rounded w-28 h-4 my-1 animate-pulse"></div>
                                        <div className="bg-zinc-400 rounded w-32 h-4 animate-pulse"></div>
                                    </div>
                                </>
                            }
                        </div>
                        <ChevronDown size={16} className="text-gray-400 cursor-not-allowed" />
                    </div>
                </div>
                <p className='w-full flex justify-center mt-3 text-xs z-20'>Crafted with ❤️ by
                    <span className='pl-1 cursor-pointer font-medium'>
                        <a href='https://linktr.ee/nishant.chauhan' target='_blank'>Nishant</a>
                    </span>
                </p>
            </div>
        </div>
    );
}
