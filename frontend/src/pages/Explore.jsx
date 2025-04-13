import React, { useState } from 'react'
import Sidebar from '../components/SideNav'
import Dropdown from '../components/Dropdown';
import ProfileCard from '../components/ProfileCard';
import { Calendar, Tag, Edit, Save, User, Mail, StickyNote, Cross, EyeClosed, X } from "lucide-react";

const Explore = () => {

    const [isNavOpen, setIsNavOpen] = useState(true);
    const [profileCard, setProfileCard] = useState('');
    const [addNew, setIsAddNew] = useState(false); const [isEditing, setIsEditing] = useState(true);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const dropdownOptions = ["All Categories", "Friends", "Clients", "VIPs"];
    const [client, setClient] = useState({
        name: "",
        email: "",
        birthday: "",
        anniversary: "",
        tags: "",
        lastContacted: "",
        notes: "",
    });

    const handleSearch = () => { }

    return (
        <>
            {/* Add New Profile Popup */}
            {addNew ?
                <div>
                    {/* Backdrop */}
                    <div
                        className={`h-screen fixed bg-[#09090b] opacity-5 z-40 flex justify-center items-center transition-all duration-500 ease-in-out w-full ${addNew ? 'opacity-100 top-0' : 'opacity-0 -top-[100vh]'
                            }`}
                    ></div>

                    {/* Card */}
                    <div
                        className={`max-w-md fixed left-1/2 -translate-x-1/2 z-50 w-full mx-auto rounded-2xl bg-[#18181b] border border-[#333] text-white shadow-xl p-6 space-y-4 transition-all duration-500 ease-in-out ${addNew
                            ? 'top-1/2 -translate-y-1/2 opacity-100'
                            : 'top-0 -translate-y-full opacity-0 pointer-events-none'
                            }`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-white">Person Details</h2>
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={toggleEdit}
                                    className="border border-[#444] px-3 py-1 rounded flex items-center gap-1 text-sm text-white hover:underline"
                                >
                                    {isEditing ? <Save size={16} /> : <Edit size={16} />}
                                    {isEditing ? 'Save' : 'Edit'}
                                </button>
                                <button
                                    onClick={() => setIsAddNew(false)}
                                    className="border border-[#444] px-3 py-1 rounded flex items-center gap-1 text-sm text-white hover:underline"
                                >
                                    <X size={16} />
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* Name & Email */}
                        <div className="space-y-3">
                            <LabelInput
                                icon={<User size={16} />}
                                label="Name"
                                name="name"
                                value={client.name}
                                onChange={handleChange}
                                isEditing={isEditing}
                                inputClassName="bg-[#2a2a2a] text-white border-[#444]"
                            />
                            <LabelInput
                                icon={<Mail size={16} />}
                                label="Email"
                                name="email"
                                value={client.email}
                                onChange={handleChange}
                                isEditing={isEditing}
                                inputClassName="bg-[#2a2a2a] text-white border-[#444]"
                            />
                        </div>

                        {/* Birthday & Anniversary */}
                        <div className="grid grid-cols-2 gap-4">
                            <LabelInput
                                icon={<Calendar size={16} />}
                                label="Birthday"
                                name="birthday"
                                value={client.birthday}
                                onChange={handleChange}
                                isEditing={isEditing}
                                type="date"
                                inputClassName="bg-[#2a2a2a] text-white border-[#444]"
                            />
                            <LabelInput
                                icon={<Calendar size={16} />}
                                label="Anniversary"
                                name="anniversary"
                                value={client.anniversary}
                                onChange={handleChange}
                                isEditing={isEditing}
                                type="date"
                                inputClassName="bg-[#2a2a2a] text-white border-[#444]"
                            />
                        </div>
                        
                        <div className='flex items-center gap-2'>
                            {/* Tags */}
                            <div className='w-1/2'>
                                <div className='flex items-center gap-2 mb-1'>
                                    <Tag size={16} />
                                    <label className='text-[#9f9fa9]'>Tag</label>
                                </div>
                                <Dropdown categories={dropdownOptions} />
                            </div>

                            {/* Last Contacted */}
                            <div className='w-1/2 mt-1'>
                                <LabelInput
                                    icon={<Calendar size={16} />}
                                    label="Last Contacted"
                                    name="lastContacted"
                                    value={client.lastContacted}
                                    onChange={handleChange}
                                    isEditing={isEditing}
                                    type="date"
                                    inputClassName="bg-[#2a2a2a] text-white border-[#444]"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-sm text-slate-300 flex items-center gap-2 mb-1">
                                <StickyNote size={16} />
                                Notes
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="notes"
                                    value={client.notes}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                                    rows={4}
                                    placeholder="Write something..."
                                />
                            ) : (
                                <p className="text-sm text-slate-300 bg-[#2a2a2a] border border-[#444] rounded-md px-3 py-2">
                                    {client.notes || 'No notes added.'}
                                </p>
                            )}
                        </div>
                    </div>

                </div> : ''
            }

            <div className='flex z-0 items-center gap-3 h-screen w-screen bg-zinc-900 px-5'>
                {isNavOpen ? <Sidebar /> : ''}

                {/* Top Header */}
                <section className={`bg-[#09090b] rounded-lg h-[95vh] transition-all duration-300 w-full ${isNavOpen ? '' : 'w-screen'}`}>
                    <div className='h-12 px-5 flex items-center w-full border-b-2 border-zinc-900'>
                        <div value='isNavOpen' className='cursor-pointer' onClick={() => setIsNavOpen(!isNavOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-icon lucide-panel-right"><rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M15 3v18" />
                            </svg>
                        </div>
                        <div className='mx-4 h-5 border-1 border-[#27272a]'></div>
                        <p className='text-white'>Explore</p>
                    </div>

                    {/* Bottom Heeader */}
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
                        <div className='flex items-center text-white mx-7 px-3 py-2 mb-5 border bg-zinc-800 rounded-lg border-[#a1a1aa]'> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className='mr-1'><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg> NOTE :
                            <p className='px-2'>You can add temporary credentials to verify the dynamic working of the product, but don't forget to remove once the verified!</p>
                        </div>
                    </section>

                    {/* Profile Cards */}
                    <section className='flex gap-3 px-5'>
                        <ProfileCard />
                        <ProfileCard />
                        <ProfileCard />
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