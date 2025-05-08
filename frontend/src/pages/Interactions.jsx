import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Interactions = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    //Logout Function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

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

                setUserName(response.data.user.name);
            } catch (error) {
                console.error("Error fetching user:", error);
                localStorage.removeItem("authToken");
                navigate("/login");
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <div className='flex items-center gap-3 h-screen w-screen bg-zinc-900 px-5'>
                {isNavOpen ? <Sidebar /> : ''}


                <section className={`bg-[#09090b] rounded-lg h-[95vh] transition-all duration-300 w-full ${isNavOpen ? '' : 'w-screen'}`}>
                    {/* Top Header */}
                    <div className='h-12 px-5 flex items-center w-full border-b-2 border-zinc-900'>
                        <div value='isNavOpen' className='cursor-pointer' onClick={() => setIsNavOpen(!isNavOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-icon lucide-panel-right"><rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M15 3v18" />
                            </svg>
                        </div>
                        <div className='mx-4 h-5 border-1 border-[#27272a]'></div>
                        <p className='text-white'>Interactions</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Interactions;