import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Tag, User, StickyNote, House, UserRoundPen, Send, Star, UserX, Handshake, BadgeIndianRupee, HandCoins } from "lucide-react";

export default function ProfileCard({ addNew }) {

    const [cards, setCards] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [activeEditCard, setActiveEditCard] = useState(null);

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

    const toggleEditMenu = (cardId) => {
        setActiveEditCard((prev) => (prev === cardId ? null : cardId));
    };

    const deleteCard = async (id) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No token found, please login.");
            return;
        }
        try {
            console.log(id);
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/card/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { id }
            });
            if (!response) {
                console.log("Error in deleting the card from frontend");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCards();
    }, [addNew, isDeleted]);

    if (loading) return <div className="w-7xl min-h-[65vh] top-50% flex justify-center items-center text-white">Loading...</div>;

    return (
        <>
            {
                cards[0] != null
                    ?
                    <div className="text-white min-h-[65vh] w-[315%] flex justify-center items-center">Add a card!</div>
                    :
                    <>
                        {cards.map((user, key) => (
                            <div
                                key={user._id}
                                className="relative max-w-md w-full mx-2 bg-zinc-900 text-zinc-100 rounded-2xl shadow-lg p-6 space-y-5 border border-zinc-800"
                            >
                                {/* Edit Dropdown (Floating above the card) */}
                                {activeEditCard === user._id && (
                                    <div className="absolute z-50 top-18 w-[60%] right-6 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg p-3 space-y-2">
                                        <button className="w-full flex justify-start gap-2 text-md cursor-not-allowed text-left text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                            <UserRoundPen /> Edit (dev)
                                        </button>
                                        <button className="w-full flex justify-start gap-2 text-md cursor-not-allowed text-left text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                            <Send /> Interact (dev)
                                        </button>
                                        <button className="w-full flex justify-start gap-2 text-md cursor-not-allowed text-left text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                            <UserX /> Remove (dev)
                                        </button>
                                        <button className="w-full flex justify-start gap-2 text-md cursor-not-allowed text-left text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                            <Star /> Star (dev)
                                        </button>
                                        <button className="w-full flex justify-start gap-2 text-md cursor-not-allowed text-left text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                            <Handshake />Settle (dev)
                                        </button>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-600 text-white rounded-full w-12 h-10 flex items-center justify-center font-bold text-lg">
                                        {user.name?.charAt(0)}
                                    </div>
                                    <div className="w-full flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold">{user.name}</h2>
                                            <p className="text-sm text-zinc-400">{user.email}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={() => toggleEditMenu(user._id)}
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                className="cursor-pointer"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="grid z-0 grid-cols-2 gap-4">
                                    <DetailItem icon={<HandCoins size={16} />} label="Type" value={user.transactionType} />
                                    <DetailItem icon={<BadgeIndianRupee size={16} />} label="Amount" value={user.transactionAmount} />
                                    <DetailItem icon={<Tag size={16} />} label="Tag" value={user.tag} />
                                    <DetailItem
                                        icon={<Calendar size={16} />}
                                        label="Date"
                                        value={new Date(user.transactionDate).toLocaleDateString("en-GB")}
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <div className="flex items-center gap-2 mb-1 text-sm text-zinc-400">
                                        <StickyNote size={16} />
                                        Notes
                                    </div>
                                    <p className="text-sm text-zinc-200 bg-zinc-800 rounded-md px-3 py-2 whitespace-pre-wrap min-h-[3rem]">
                                        {user.notes}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
            }
        </>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-0.5">
                {icon}
                <span>{label}</span>
            </div>
            <p className="text-sm font-medium text-zinc-200 bg-zinc-800 px-2 py-1.5 rounded-md">
                {value}
            </p>
        </div>
    );
}