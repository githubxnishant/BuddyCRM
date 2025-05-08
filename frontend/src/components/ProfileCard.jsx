import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Tag, User, StickyNote, House, Edit, UserMinus, UserX } from "lucide-react";

export default function ProfileCard({addNew}) {

    const [cards, setCards] = useState('');
    const [loading, setLoading] = useState(true);
    // const [isEditing, setIsEditing] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    // const client = {
    //     name: "Aarav Sharma",
    //     email: "aarav.sharma@example.com",
    //     company: "Salesforce",
    //     designation: "AMTS",
    //     tags: "VIP",
    //     lastContacted: "2025-04-01",
    //     notes: `Prefers weekend meetings.\nResponds quickly over email.\nInterested in premium offerings.`,
    // };

    const fetchCards = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No token found, please login.");
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/card/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCards(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setLoading(false);
        }
    };

    const deleteCard = async (id) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No token found, please login.");
            return;
        }
        try{
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/card/delete`, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { id }
            });
            if(!response){
                console.log("Error in deleting the card from frontend");
            }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCards();
    }, [addNew, isDeleted]);

    if (loading) return <div className="text-center py-10 text-white">Loading...</div>;

    return (
        <>
            {cards.map((client, key) => (
                <div>
                    <div className="max-w-md w-full mx-2 mb-2 bg-zinc-900 text-zinc-100 rounded-2xl shadow-lg p-6 space-y-5 border border-zinc-800">

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
                                    {/* <Edit onClick={() => setIsEditing(!isEditing)} /> */}
                                    {/* {isEditing && */}
                                        {/* <div className="z-10"> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" className="cursor-pointer"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" className="cursor-pointer"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" x2="22" y1="8" y2="13" /><line x1="22" x2="17" y1="8" y2="13" /></svg> */}
                                            <UserX value={isDeleted} onClick={(key) => {deleteCard(client._id); setIsDeleted(!isDeleted)}}/>
                                        {/* </div> */}
                                    {/* } */}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem icon={<House size={16} />} label="Company" value={client.company} />
                            <DetailItem icon={<User size={16} />} label="Designation" value={client.designation} />
                            <DetailItem icon={<Tag size={16} />} label="Tags" value={client.tag} />
                            <DetailItem icon={<Calendar size={16} />} label="Last Contacted" value={client.lastContacted} />
                        </div>

                        {/* Notes */}
                        <div>
                            <div className="flex items-center gap-2 mb-1 text-sm text-zinc-400">
                                <StickyNote size={16} />
                                Notes
                            </div>
                            <p className="text-sm text-zinc-200 bg-zinc-800 rounded-md px-3 py-2 whitespace-pre-wrap min-h-[3rem]">
                                {client.notes}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-0.5">
                {icon}
                <span>{label}</span>
            </div>
            <p className="text-sm font-medium text-zinc-200 bg-zinc-800 px-2 py-1.5 rounded-md">
                {value}
            </p>
        </div>
    );
}