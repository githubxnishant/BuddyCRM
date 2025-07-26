import React, { useState, useEffect } from 'react'
import Sidebar from '../utils/SideNav'
import Dropdown from '../utils/Dropdown';
import ExploreCard from '../components/Transactions/ExploreCard';
import { Tag, User, StickyNote, House, Calendar, Edit, Save, Mail, Cross, EyeClosed, X, ShieldAlert } from "lucide-react";
import axios from 'axios';
import AddCard from '../components/Transactions/AddCard';

const Transactions = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const [profileCard, setProfileCard] = useState('');
    const [addNew, setAddNew] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [added, setAdded] = useState(false);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const dropdownOptions = ["All Categories", "Friends", , "Relative", "Clients", "VIPs", "Others"];
    const [client, setClient] = useState();

    const handleSearch = () => { }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px");
        const handleResize = () => setIsNavOpen(mediaQuery.matches);
        handleResize();
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const toggle = !isNavOpen;

    return (
        <>

            <AddCard
                addNew={addNew}
                added={added}
                setAddNew={setAddNew}
                setAdded={setAdded}
                onClose={() => {
                    setAddNew(false);
                }}
            />

            <div className='flex z-0 items-center gap-3 h-screen w-screen bg-zinc-900 md:px-4'>
                {isNavOpen ? <Sidebar /> : ''}
                <section className={`bg-[#09090b] w-full md:rounded-lg h-screen md:h-[95vh] transition-all md:absolute md:right-4 overflow-scroll duration-500 ${isNavOpen ? 'md:w-[82vw] w-20' : 'md:w-[98vw]'}`}>
                    {/* Top Header */}
                    <div className='h-12 px-5 flex items-center w-full border-b-2 border-zinc-900'>
                        <div value='isNavOpen' className='cursor-pointer' onClick={() => setIsNavOpen(!isNavOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" ><rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M15 3v18" />
                            </svg>
                        </div>
                        <div className='mx-4 h-5 border-1 border-[#27272a]'></div>
                        <p className='text-white'>Transactions</p>
                    </div>

                    {/* Bottom Header */}
                    <section className='flex justify-between md:items-center flex-col md:flex-row md:gap-0 gap-3 py-5 mx-7'>
                        <div className="w-auto flex justify-between items-center gap-3 bg-[#0a0a0a] rounded-md">
                            <input
                                type="email"
                                placeholder="mailxnishant@gmail.com"
                                value={profileCard}
                                onChange={(e) => setProfileCard(e.target.value)}
                                className="bg-transparent text-white border border-zinc-700 px-2 py-1 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 w-52 md:w-68 placeholder:text-zinc-400"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-white cursor-pointer text-black px-4 py-2 md:text-base text-sm rounded-md hover:bg-zinc-200 transition"
                            >
                                Search
                            </button>
                        </div>

                        <div className='flex md:w-auto md:justify-center justify-between items-center gap-3'>
                            <Dropdown categories={dropdownOptions} />
                            <button
                                value={addNew}
                                onClick={() => setAddNew(!addNew)}
                                className="bg-white md:text-base text-sm cursor-pointer text-black px-2 md:px-4 py-2 rounded-md hover:bg-zinc-200 transition"
                            >
                                Add New
                            </button>
                        </div>
                    </section>

                    {/* NOTE Section */}
                    <section>
                        <p className='flex md:items-center text-white mx-7 px-3 py-2 mb-5 border bg-zinc-800 rounded-lg border-[#a1a1aa]'>
                            <span className='flex justify-center mt-1 mr-2'><ShieldAlert /></span><span>NOTE : You can add temporary credentials to verify the dynamic working of the product, but don't forget to remove performing the operations!</span>
                        </p>
                    </section>

                    {/* Profile Cards */}
                    <section className='h-[70%] overflow-auto'>
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 overflow-auto gap-5 md:px-5 md:py-0 pb-5 md:mr-4 md:ml-0 mx-7'>
                            <ExploreCard addNew={added} />
                        </div>
                    </section>
                </section>
            </div>
        </>
    )
}

function LabelInput({ icon, label, name, value, onChange, isEditing, type = "text", placeholder }) {
    return (
        <div>
            <label className="text-sm text-[#9f9fa9] flex items-center gap-2 mb-1">
                {icon}
                {label}
            </label>
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
                />
            ) : (
                <p className="text-sm text-slate-700 bg-slate-50 rounded-md px-3 py-2">
                    {value || `No ${label.toLowerCase()} provided.`}
                </p>
            )}
        </div>
    );
}

export default Transactions;