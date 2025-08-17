import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/SideNav';
import axios from 'axios';
import DashboardStatCard from '../components/Dashboard/StatCard';
import MiniCards from '../components/Dashboard/ProfileCard';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const [userName, setUserName] = useState('');
    const [userCard, setUserCard] = useState([]);
    const [connectionLength, setConnectionLength] = useState('');
    const [oweAmount, setOweAmount] = useState('');
    const [lendAmount, setLendAmount] = useState('');
    const [statLoading, setStatLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const navigate = useNavigate();

    //Logout Function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px");
        const handleResize = () => setIsNavOpen(mediaQuery.matches);
        handleResize();
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/card/get`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserCard(response.data);
                setConnectionLength(response.data.length);
            } catch (err) {
                console.error("Failed to fetch cards:", err);
            }
        };

        getUsers();
    }, []);

    useEffect(() => {
        setStatLoading(true);
        const totalOwe = userCard
            .filter(txn => txn.transactionType === "Owe (Pay)")
            .filter(txn => txn.transactionType === "Owe (Pay)")
            .reduce((sum, txn) => sum + txn.transactionAmount, 0);
        setOweAmount(totalOwe);
        const totalLend = userCard
            .filter(txn => txn.transactionType === "Lend (Collect)")
            .filter(txn => txn.transactionType === "Lend (Collect)")
            .reduce((sum, txn) => sum + txn.transactionAmount, 0);
        setLendAmount(totalLend)
        setStatLoading(false);
    }, [userCard])

    useEffect(() => {
        const fetchUser = async () => {
            setUserLoading(true);
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
            } finally {
                setUserLoading(false)
            }
        };
        fetchUser();
    }, []);

    const toggle = isNavOpen;

    return (
        <>
            <div className='flex items-center gap-3 h-screen w-screen bg-zinc-900 md:px-4'>
                {isNavOpen ? <Sidebar /> : ''}
                <section className={`bg-[#09090b] md:rounded-lg h-screen md:h-[95vh] transition-all md:absolute md:right-4 overflow-scroll duration-500 ${toggle ? 'md:w-[82vw] w-20' : 'md:w-[98vw]'}`}>
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
                    <div className='md:mx-7 mx-5 mt-2 pt-2 md:px-3'>
                        <p className='text-white text-lg  flex justify-between'>Welcome 👋
                            <button onClick={handleLogout} className='bg-white flex text-sm justify-center items-center gap-2 cursor-pointer text-black md:px-4 px-2 py-1 md:py-2 rounded-md hover:bg-zinc-200 transition'>Logout</button>
                        </p>
                        {!userLoading
                            ? <h1 className='text-white text-2xl md:text-4xl'>{userName}</h1>
                            : <div className='h-12 w-60 animate-pulse bg-zinc-800 rounded'></div>
                        }
                    </div>
                    {/* Stats Card */}
                    <section className='md:flex grid grid-rows-2 grid-cols-2 px-5 md:py-0 py-3 overflow-scroll gap-3 md:gap-0 md:my-0 my-5'>
                        {!statLoading
                            ? <>
                                <DashboardStatCard heading={"Transactions"} stats={`${connectionLength}+`} subheading={"Transactions till now"} />
                                <DashboardStatCard heading={"Owe Amount"} stats={`₹ ${oweAmount}`} subheading={"Have to be paid"} />
                                <DashboardStatCard heading={"Lend Amount"} stats={`₹ ${lendAmount}`} subheading={"Have to be collected"} />
                                <DashboardStatCard heading={"Interactions"} stats={"0+"} subheading={"Interacted till now"} />
                            </>
                            : Array.from({ length: 4 }, (_, index) => (
                                <div className='md:w-1/4 w-full md:h-auto h-auto border-2 px-5 py-3 border-[#27272a] rounded-lg md:my-6 md:mx-2'>
                                    <div className='h-8 m-2 w-32 bg-zinc-800 rounded animate-pulse'></div>
                                    <div className='h-12 m-2 w-12 bg-zinc-800 rounded animate-pulse'></div>
                                    <div className='h-5 m-2 w-36 bg-zinc-800 rounded animate-pulse'></div>
                                </div>
                            ))
                        }
                    </section>

                    <section className='md:px-7 px-5 mb-5 md:mb-7 flex items-center w-full'>
                        <div className='flex py-3 flex-col items-center h-full w-full border-2 rounded-lg border-[#27272a]'>
                            <p className='text-white w-full text-left px-7 pb-4 my-1 md:text-2xl text-lg flex justify-between'>Recent Transactions
                                <Link to={"/transactions"}><button className="bg-white md:text-base text-sm w-auto flex justify-center items-center gap-2 cursor-pointer text-black md:px-5 px-2 py-1 rounded-md hover:bg-zinc-200 transition">View All</button></Link>
                            </p>
                            <div className='w-full px-5'>
                                <div className='border-white flex items-center gap-3 overflow-auto justify-start'>
                                    <MiniCards />
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}

export default Dashboard