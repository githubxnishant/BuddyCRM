import React from 'react';
import { Calendar, Mail, Tag, User, StickyNote } from "lucide-react";

const MiniCard = () => {

    const client = {
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        birthday: "1998-04-12",
        anniversary: "2020-06-21",
        tags: "VIP",
        lastContacted: "2025-04-01",
        notes: `Prefers weekend meetings.\nResponds quickly over email.\nInterested in premium offerings.`,
    };

    return (
        <>
            <div className="max-w-md w-88 mx-2 mb-2 bg-zinc-900 text-zinc-100 rounded-2xl shadow-lg p-6 space-y-5 border border-zinc-800">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 text-white rounded-full w-12 h-10 flex items-center justify-center font-bold text-lg">
                        {client.name?.charAt(0)}
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">{client.name}</h2>
                            <p className="text-sm text-zinc-400">{client.email}</p>
                        </div>
                        <div className="flex gap-2">
                            
                            
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <DetailItem icon={<Tag size={16} />} label="Tags" value={client.tags} />
                    <DetailItem icon={<Calendar size={16} />} label="Last Contacted" value={client.lastContacted} />
                </div>

                <div className='flex gap-3'>
                    <button
                        className="bg-white w-1/2 flex text-sm justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="cursor-pointer"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                        Interact
                    </button>
                    <button
                        className="bg-white text-sm w-1/2 flex justify-center items-center gap-2 cursor-pointer text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="cursor-pointer"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" x2="22" y1="8" y2="13" /><line x1="22" x2="17" y1="8" y2="13" /></svg>
                        Remove
                    </button>
                </div>
            </div>
        </>
    )
}

function DetailItem({ icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                {icon}
                <span>{label}</span>
            </div>
            <p className="text-sm font-medium text-zinc-200 bg-zinc-800 px-2 py-1.5 rounded-md">
                {value}
            </p>
        </div>
    );
}

export default MiniCard