import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideNav';
import axios from 'axios';
import DashboardStatCard from '../components/DashboardStatCard';
import MiniCard from '../components/DashbordProfileCard';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const [userName, setUserName] = useState('');
    const [userCard, setUserCard] = useState([]);
    const [connectionLength, setConnectionLength] = useState('');
    const [oweAmount, setOweAmount] = useState('');
    const [lendAmount, setLendAmount] = useState('');
    const navigate = useNavigate();

    //Logout Function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

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
        console.log(userCard);
        const totalOwe = userCard
            .filter(txn => txn.transactionType === "Owe (To Pay)")
            .reduce((sum, txn) => sum + txn.transactionAmount, 0);
        setOweAmount(totalOwe);

        const totalLend = userCard
            .filter(txn => txn.transactionType === "Lend (To Collect)")
            .reduce((sum, txn) => sum + txn.transactionAmount, 0);
        setLendAmount(totalLend);
    }, [userCard])

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
                <section className={`bg-[#09090b] rounded-lg h-[95vh] transition-all absolute right-4 duration-500 ${isNavOpen ? 'w-[82vw]' : 'w-[98vw]'}`}>
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
                            <button onClick={handleLogout} className='bg-white flex text-sm justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition'>Logout</button>
                        </p>
                        <h1 className='text-white text-4xl'>{userName}</h1>
                    </div>
                    {/* Stats Card */}
                    <section className='flex px-5'>
                        <DashboardStatCard heading={"Connections"} stats={`${connectionLength}+`} subheading={"Connected till now"} />
                        <DashboardStatCard heading={"Owe Amount"} stats={`₹ ${oweAmount}`} subheading={"Have to be paid"} />
                        <DashboardStatCard heading={"Lend Amount"} stats={`₹ ${lendAmount}`} subheading={"Have to be collected"} />
                        <DashboardStatCard heading={"Interactions"} stats={"0+"} subheading={"Interacted till now"} />
                    </section>

                    <section className='px-7 flex items-center w-full'>
                        <div className='flex py-5 flex-col items-center h-full w-full border rounded-lg border-[#27272a]'>
                            <p className='text-white w-full text-left px-7 pb-4 text-2xl flex justify-between'>Recent Transactions!
                                <Link to={"/explore"}><button className="bg-white text-base w-auto flex justify-center items-center gap-2 cursor-pointer text-black px-5 py-1 rounded-md hover:bg-zinc-200 transition">View All</button></Link>
                            </p>
                            <div className='w-full px-5'>
                                <div className='border-white flex items-center gap-3 overflow-auto justify-start'>
                                    <MiniCard />
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