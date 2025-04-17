import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    Clock,
    Folder,
    BookOpen,
    Settings,
    Users,
    Briefcase,
    Globe,
    MoreHorizontal,
    LifeBuoy,
    Send,
} from "lucide-react";

export default function Sidebar() {
    const [platformOpen, setPlatformOpen] = useState(true);
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
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
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="w-64 h-screen bg-[#18181b] text-white flex flex-col justify-between py-5">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3">
                        <div className=" flex justify-center items-start scale-200">⌘</div>
                        {/* <div className="bg-blue-600 flex justify-center h-8 w-8 rounded-md text-white font-bold text-xl">⌘</div> */}
                        <div>
                            <p className=" flex justify-center items-center text-lg font-semibold">BuddyCRM</p>
                        </div>
                    </div>
                </div>

                {/* Platform Section */}
                <div className="text-xs uppercase w-full flex justify-start px-2 text-gray-400 mb-2">Quick Nav</div>


                <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                    <LayoutDashboard size={16} />
                    <Link to={'/'}>Dashboard</Link>
                </div>

                <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                    <Users size={16} />
                    <span>Explore</span>
                </div>

                <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                    <Send size={16} />
                    <span>Interactions</span>
                </div>

                {/* Projects Section */}
                <div className="mt-6">
                    <div className="text-xs uppercase text-gray-400 mb-2">More Features (Under Dev)</div>
                    <div className="space-y-1">
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
                                <div className="text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">History</div>
                                <div className="text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">Starred</div>
                                <div className="text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">Settings</div>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                            <Briefcase size={16} />
                            <span>Analytics</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                            <BookOpen size={16} />
                            <span>Schedules</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm hover:bg-zinc-800 rounded px-2 py-1 cursor-pointer">
                            <MoreHorizontal size={16} />
                            <span>More</span>
                        </div>
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
                    <div className="flex items-center gap-2">
                        <img
                            src="https://github.com/shadcn.png"
                            alt="user"
                            className="w-7 h-7 rounded-full"
                        />
                        <div>
                            <p className="text-sm font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                        <ChevronDown size={16} className="text-gray-400 cursor-not-allowed" />
                    </div>
                </div>
            </div>
        </div>
    );
}
