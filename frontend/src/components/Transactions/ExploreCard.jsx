import { useState, useEffect } from "react";
import axios from "axios";
import {
    Calendar,
    Tag,
    StickyNote,
    UserRoundPen,
    Send,
    Star,
    UserX,
    Handshake,
    BadgeIndianRupee,
    HandCoins,
} from "lucide-react";
import AddCard from "./AddCard";
import { toast } from "react-toastify";

export default function ProfileCard({ addNew, setAddNew, added, setAdded }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeEditCard, setActiveEditCard] = useState(null);
    const [editCard, setEditCard] = useState(false);
    const [editData, setEditData] = useState(null);
    const [updated, setUpdated] = useState(0);

    const fetchCards = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return console.error("No token found");
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/card/get`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCards(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching cards:", err);
            setLoading(false);
        }
    };

    const toggleEditMenu = (cardId) => {
        setActiveEditCard((prev) => (prev === cardId ? null : cardId));
    };

    const deleteCard = async (id) => {
        const token = localStorage.getItem("authToken");
        if (!token) return console.error("No token found");
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/card/delete/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.status === 200) {
                setActiveEditCard(null);
                fetchCards(); 
                toast.success("Card deleted successfully!")
            } else {
                console.error("Delete failed:", res);
                toast.error("Unexpected error occured!");
            }
        } catch (err) {
            console.error("Error deleting card:", err);
            toast.error("Unexpected error occured!");
        }
    };

    const receiveDataFromAddCard = (data) => {
        setUpdated(data);
    }

    useEffect(() => {
        fetchCards();
    }, [addNew, updated]);

    if (loading)
        return (
            <div className="w-7xl min-h-[65vh] flex justify-center items-center text-white">
                Loading...
            </div>
        );

    return (
        <>
            {cards.length === 0 ? (
                <div className="text-white min-h-[65vh] w-[315%] flex justify-center items-center">
                    Add a card!
                </div>
            ) : (
                <>
                    {editCard && (
                        <AddCard
                            sendUpdateToExploreCard={receiveDataFromAddCard}
                            added={added}
                            setAdded={setAdded}
                            editData={editData}
                            onClose={() => {
                                setEditCard(false);
                                setEditData(null);
                            }}
                        />
                    )}
                    {cards.map((user) => (
                        <div
                            key={user._id}
                            className="relative md:max-w-md md:w-full md:mx-2 bg-zinc-900 text-zinc-100 rounded-2xl shadow-lg p-6 space-y-5 border border-zinc-800"
                        >
                            {activeEditCard === user._id && (
                                <div className="absolute z-50 top-18 w-[60%] right-6 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg p-3 space-y-2">
                                    <button
                                        onClick={() => {
                                            setEditCard(true);
                                            setActiveEditCard(null);  // optionally close the edit menu
                                            setEditData(user);
                                        }}
                                        className="w-full flex gap-2 text-white px-2 py-1 hover:bg-zinc-700 rounded"
                                    >
                                        <UserRoundPen /> Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCard(user._id)}
                                        className="w-full flex gap-2 text-white px-2 py-1 hover:bg-zinc-700 rounded"
                                    >
                                        <UserX /> Remove
                                    </button>
                                    <button className="w-full flex gap-2 cursor-not-allowed text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                        <Send /> Interact (dev)
                                    </button>
                                    <button className="w-full flex gap-2 cursor-not-allowed text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                        <Star /> Priority (dev)
                                    </button>
                                    <button className="w-full flex gap-2 cursor-not-allowed text-white px-2 py-1 hover:bg-zinc-700 rounded">
                                        <Handshake /> Settle (dev)
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-600 text-white rounded-full w-12 h-10 flex items-center justify-center font-bold text-lg">
                                    {user.name?.charAt(0)}
                                </div>
                                <div className="w-full flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">{user.name}</h2>
                                        <p className="text-sm text-zinc-400">{user.email}</p>
                                    </div>
                                    <svg
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

                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem
                                    icon={<HandCoins size={16} />}
                                    label="Type"
                                    value={user.transactionType}
                                />
                                <DetailItem
                                    icon={<BadgeIndianRupee size={16} />}
                                    label="Amount"
                                    value={user.transactionAmount}
                                />
                                <DetailItem
                                    icon={<Tag size={16} />}
                                    label="Tag"
                                    value={user.tag}
                                />
                                <DetailItem
                                    icon={<Calendar size={16} />}
                                    label="Date"
                                    value={new Date(user.transactionDate).toLocaleDateString(
                                        "en-GB"
                                    )}
                                />
                            </div>

                            <div>
                                <div className="flex gap-2 mb-1 text-sm text-zinc-400">
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
            )}
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