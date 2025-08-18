import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/SideNav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddInteraction from '../components/Interaction/AddInteraction';
import AddMessage from '../components/Interaction/AddMessage';
import { useTimer } from '../context/TimerContext';
import { Link } from 'lucide-react';

const Interactions = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const [userName, setUserName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [addNew, setAddNew] = useState(false);
    const [added, setAdded] = useState(false);
    const [credits, setCredits] = useState('');

    const navigate = useNavigate();
    const { sessionTimeout } = useTimer();

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
                setCredits(response.data.user.credits);
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
            <div className='flex items-center gap-3 h-screen w-screen bg-zinc-900 px-4'>
                {isNavOpen ? <Sidebar /> : ''}
                <section className={`bg-[#09090b] rounded-lg h-[95vh] transition-all absolute right-4 duration-500 ${isNavOpen ? 'w-[82vw]' : 'w-[98vw]'}`}>
                    {/* Top Header */}
                    <div className='h-12 px-5 rounded-t-lg flex items-center w-full border-b-2 sticky top-0 bg-[#09090b] border-zinc-900'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex w-auto max-w-full'>
                                <div value='isNavOpen' className='cursor-pointer' onClick={() => setIsNavOpen(!isNavOpen)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" ><rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M15 3v18" />
                                    </svg>
                                </div>
                                <div className='mx-4 h-5 border-1 border-[#27272a]'></div>
                                <p className='text-white'>Interactions</p>
                            </div>
                            <div className='flex md:gap-3 gap-2 items-center'>
                                <button className='bg-white flex md:text-sm text-xs justify-center items-center gap-2 cursor-not-allowed text-black px-2 rounded-full hover:bg-zinc-200 py-1 transition font-semibold'>Explore Plus</button>
                                <p className='flex md:text-sm text-xs justify-center items-center gap-2 cursor-not-allowed text-white px-2 rounded-full border py-1 transition animate-pulse'>Expiry: {sessionTimeout}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Header */}
                    <section className='flex justify-between md:items-center flex-col md:flex-row md:gap-0 gap-3 py-5 mx-7'>
                        <div className='w-auto flex text-white'>
                            <p>Remaining Credits: {credits}</p>
                        </div>

                        <div className="w-auto flex justify-between items-center gap-3 bg-[#0a0a0a] rounded-md">
                            <input
                                type="email"
                                placeholder="mailxnishant@gmail.com"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent text-white border border-zinc-700 px-2 py-1 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 w-full md:w-80 placeholder:text-zinc-400"
                            />
                        </div>

                        <div className='flex md:w-auto md:justify-center justify-between items-center gap-3'>
                            <button
                                value={addNew}
                                onClick={() => setAddNew(!addNew)}
                                className="bg-white md:text-base text-sm w-28 cursor-pointer text-black px-2 md:px-4 py-2 rounded-md hover:bg-zinc-200 transition"
                            >
                                {addNew ? <p>View All</p> : <p>Add New</p>}
                            </button>
                        </div>
                    </section>

                    {/* Main Content */}
                    <section className='w-full h-[80%] px-5 overflow-scroll '>
                        {!addNew
                            ? <table className='w-full rounded-lg text-white text-center'>
                                <thead className='h-12 bg-zinc-900 sticky top-0'>
                                    <tr>
                                        <td>S.no.</td>
                                        <td>Date</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Amount</td>
                                        <td>Tone</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody className='bg-zinc-800'>
                                    {Array.from({ length: 50 }, (_, index) => (
                                        <tr key={index} className='h-12 border-y'>
                                            <td>{index + 1}</td>
                                            <td>2025-08-01</td>
                                            <td>Aarav Mehta</td>
                                            <td>aarav.mehta@example.com</td>
                                            <td className="num">₹12,499.00</td>
                                            <td><span className="chip">Friendly</span></td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <div className='flex'>
                                <AddInteraction />
                                <AddMessage />
                            </div>
                        }
                    </section>
                </section>
            </div>
        </>
    )
}

export default Interactions;