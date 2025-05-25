import React, { useState, useEffect } from 'react'
import Sidebar from '../components/SideNav'
import Dropdown from '../components/Dropdown';
import ExploreCard from '../components/ExploreCard';
import { Tag, User, StickyNote, House, Calendar, Edit, Save, Mail, Cross, EyeClosed, X, ShieldAlert } from "lucide-react";
import axios from 'axios';

const Explore = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const [profileCard, setProfileCard] = useState('');
    const [addNew, setIsAddNew] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [added, setAdded] = useState(false);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const addDropdownOptions = ["Friend", "Relatives", "Client", "VIP", "Others"];
    const dropdownOptions = ["All Categories", "Friends", , "Relative", "Clients", "VIPs", "Others"];
    const addTransactionOptions = ["Owe (To Pay)", "Lend (To Collect)"]
    const [client, setClient] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [tag, setTag] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [notes, setNotes] = useState('');

    const addConnection = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error("No token found. Please login again.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/card/add`, {
                name,
                email,
                transactionType,
                transactionAmount,
                tag,
                transactionDate,
                notes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setName('');
            setEmail('');
            setTransactionType('');
            setTransactionAmount('');
            setTag('');
            setTransactionDate('');
            setNotes('');
            setIsAddNew(false);
            setAdded(!added);
        } catch (error) {
            if (error.response.status == 409) {
                alert("User already exists!");
            } else {
                console.log(error);
            }
        }
    };

    const handleSearch = () => { }

    return (
        <>
            {/* Add New Profile Popup */}
            {addNew ?
                <div className=''>
                    {/* Backdrop */}
                    <div
                        className={`h-screen fixed bg-[#09090b] opacity-80 z-40 flex justify-center items-center transition-all duration-500 ease-in-out w-full`}
                    ></div>

                    {/* Card */}
                    <div
                        className={`max-w-md fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full mx-auto rounded-2xl bg-[#18181b] border border-[#333] text-white shadow-xl p-6 space-y-4 transition-all duration-500 ease-in-out`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-white">Person Details</h2>
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => setIsAddNew(false)}
                                    className="border border-[#444] px-3 py-1 rounded flex items-center gap-1 text-sm text-white hover:underline"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={addConnection}>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    required
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white focus:outline-none text-sm"
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white focus:outline-none text-sm"
                                />
                            </div>

                            <div className="flex items-center mt-3 gap-2">
                                <select
                                    required
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white text-sm"
                                >
                                    <option value="">Type</option>
                                    {addTransactionOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>

                                <input
                                    type="number"
                                    required
                                    placeholder="Amount"
                                    value={transactionAmount}
                                    onChange={(e) => setTransactionAmount(e.target.value)}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white focus:outline-none text-sm"
                                />
                            </div>

                            <div className="flex items-center mt-3 gap-2">
                                <select
                                    required
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white text-sm"
                                >
                                    <option value="">Category</option>
                                    {addDropdownOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>

                                <input
                                    type="date"
                                    required
                                    value={transactionDate}
                                    onChange={(e) => setTransactionDate(e.target.value)}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white focus:outline-none text-sm"
                                />
                            </div>

                            <textarea
                                name="notes"
                                required
                                placeholder="Write Notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full mt-3 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white focus:outline-none text-sm"
                                rows={4}
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-2 rounded-lg"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div> : ''
            }

            <div className='flex z-0 items-center gap-3 h-screen w-screen bg-zinc-900 px-5'>
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
                        <p className='text-white'>Explore</p>
                    </div>

                    {/* Bottom Header */}
                    <section className='flex justify-between items-center py-5 mx-7'>
                        <div className="w-1/3 flex items-center gap-3 bg-[#0a0a0a] rounded-md">
                            <input
                                type="email"
                                placeholder="mailxnishant@gmail.com"
                                value={profileCard}
                                onChange={(e) => setProfileCard(e.target.value)}
                                className="bg-transparent text-white border border-zinc-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 w-68 placeholder:text-zinc-400"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-white cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition"
                            >
                                Search
                            </button>
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            <Dropdown categories={dropdownOptions} />
                            <button
                                value={addNew}
                                onClick={() => setIsAddNew(!addNew)}
                                className="bg-white cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition"
                            >
                                Add New
                            </button>
                        </div>
                    </section>

                    {/* NOTE Section */}
                    <section>
                        <div className='flex items-center text-white mx-7 px-3 py-2 mb-5 border bg-zinc-800 rounded-lg border-[#a1a1aa]'>
                            <ShieldAlert />
                            <p className='pl-2'>NOTE :</p>
                            <p className='px-2'>You can add temporary credentials to verify the dynamic working of the product, but don't forget to remove once the verified!</p>
                        </div>
                    </section>

                    {/* Profile Cards */}
                    <section className='h-[73%] overflow-auto'>
                        <div className='grid sm:grid-cols-2 md:grid-cols-4 overflow-auto gap-3 px-5'>
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

export default Explore;