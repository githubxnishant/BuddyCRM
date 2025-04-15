import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNav';
import axios from 'axios';
import DashboardStatCard from '../components/DashboardStatCard';
import MiniCard from '../components/MiniCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

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
                const response = await axios.get("http://localhost:3000/api/fetch/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserName(response.data.user.name);
            } catch (error) {
                console.error("Error fetching user:", error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" ><rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M15 3v18" />
                            </svg>
                        </div>
                        <div className='mx-4 h-5 border-1 border-[#27272a]'></div>
                        <p className='text-white'>Dashboard</p>
                    </div>

                    {/* Greeting div */}
                    <div className='mx-7 mt-2 pt-2 px-3'>
                        <p className='text-white text-lg  flex justify-between'>Welcome 👋
                            <button onClick={handleLogout} className='border px-2 rounded cursor-pointer'>Logout</button>
                        </p>
                        <h1 className='text-white text-2xl'>{userName}</h1>
                    </div>

                    {/* Stats Card */}
                    <section className='flex px-5'>
                        <DashboardStatCard />
                        <DashboardStatCard />
                        <DashboardStatCard />
                        <DashboardStatCard />
                    </section>

                    <section className='px-7 flex items-center w-full'>
                        <div className='flex py-5 flex-col items-center h-full w-full border rounded-lg border-[#27272a]'>
                            <p className='text-white w-full text-left px-10 pb-2 text-xl flex justify-between'>New Connections!
                                <button className="bg-white text-base w-28 flex justify-center items-center gap-2 cursor-pointer text-black px-3 py-2 rounded-md hover:bg-zinc-200 transition">View All</button>
                            </p>
                            <div className='w-full border flex items-center justify-center'>
                                <MiniCard />
                                <MiniCard />
                                <MiniCard />
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}

export default Dashboard