import React, { useEffect, useState } from 'react';
import { Calendar, Mail, Tag, User, StickyNote, HandCoins, BadgeIndianRupee } from "lucide-react";
import axios from 'axios';

const MiniCards = () => {

    const [userCard, setUserCard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/card/get`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserCard(response.data);
                setIsLoading(false)
            } catch (err) {
                console.error("Failed to fetch cards:", err);
            }
        };
        getUsers();
    }, []);

    if (isLoading) {
        return (
            Array.from({ length: 3 }, (_, index) => (
                <div
                    key={index}
                    className="md:min-w-80 min-w-65 h-60 mx-2 mb-3 bg-zinc-900 rounded-lg shadow-lg p-6 space-y-5 border border-zinc-800"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <div className="bg-zinc-800 rounded-full min-w-10 w-12 h-10 flex items-center justify-center animate-pulse"></div>
                        <div>
                            <div className="h-5 w-40 rounded-md bg-zinc-800 animate-pulse"></div>
                            <div className="h-4 w-32 mt-2 rounded bg-zinc-800 animate-pulse"></div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold"></h2>
                                <p className="text-sm text-zinc-400"></p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }, (_, index) => (
                            <div key={index}>
                                <div className="flex flex-row gap-1">
                                    <div className="bg-zinc-800 px-2 py-1.5 h-5 w-5 rounded animate-pulse"></div>
                                    <div className="flex items-center w-20 gap-1.5 mb-1 h-5 bg-zinc-800 rounded animate-pulse"></div>
                                </div>
                                <div className="bg-zinc-800 px-2 py-1.5 h-7 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>

                    {/* <div className="flex gap-3">
                                <button className="bg-white w-1/2 flex text-sm justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                                    Interact
                                </button>
                                <button className="bg-white text-sm w-1/2 flex justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" x2="22" y1="8" y2="13" /><line x1="22" x2="17" y1="8" y2="13" /></svg>
                                    Remove
                                </button>
                            </div> */}
                </div>
            ))
        )
    }

    return (
        <>
            {userCard[0] != null ?
                <>
                    {userCard.slice(0, 5).map((card, index) => (
                        <div
                            key={index}
                            className="md:min-w-80 min-w-65 mx-2 mb-3 bg-zinc-900 text-zinc-100 rounded-lg shadow-lg p-6 space-y-5 border border-zinc-800"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-600 text-white rounded-full w-12 h-10 flex items-center justify-center font-bold text-lg">
                                    {card.name?.charAt(0)}
                                </div>
                                <div className="w-full flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">{card.name}</h2>
                                        <p className="text-sm text-zinc-400">{card.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem icon={<HandCoins size={16} />} label="Type" value={card.transactionType} />
                                <DetailItem icon={<BadgeIndianRupee size={16} />} label="Amount" value={card.transactionAmount} />
                                <DetailItem icon={<Tag size={16} />} label="Tags" value={card.tag} />
                                <DetailItem icon={<Calendar size={16} />} label="Date" value={new Date(card.transactionDate).toLocaleDateString("en-GB")} />
                            </div>

                            {/* <div className="flex gap-3">
                                <button className="bg-white w-1/2 flex text-sm justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                                    Interact
                                </button>
                                <button className="bg-white text-sm w-1/2 flex justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" x2="22" y1="8" y2="13" /><line x1="22" x2="17" y1="8" y2="13" /></svg>
                                    Remove
                                </button>
                            </div> */}
                        </div>
                    ))}
                </>
                :
                <div className='h-60 w-full flex justify-center items-center flex-col text-white'>
                    <p className='text-xl'>Nothing to display!</p>
                    {/* <Link to={'/explore'}>
                        <button className='bg-white flex text-sm justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition'>Add</button>
                    </Link> */}
                </div>}
        </>
    )
}

function DetailItem({ icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 md:text-sm text-xs text-zinc-400 mb-2">
                {icon}
                <span>{label}</span>
            </div>
            <p className="md:text-sm text-xs font-medium text-zinc-200 bg-zinc-800 px-2 py-1.5 rounded-md">
                {value}
            </p>
        </div>
    );
}

export default MiniCards