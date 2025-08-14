import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCard = ({ addNew, added, setAdded, editData, onClose, sendUpdateToExploreCard }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [tag, setTag] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [notes, setNotes] = useState('');

    const addDropdownOptions = ["Friend", "Relatives", "Client", "VIP", "Others"];
    const addTransactionOptions = ["Owe (Pay)", "Lend (Collect)"];

    useEffect(() => {
        if (editData) {
            setName(editData.name || '');
            setEmail(editData.email || '');
            setTransactionType(editData.transactionType || '');
            setTransactionAmount(editData.transactionAmount || '');
            setTag(editData.tag || '');
            setTransactionDate(editData.transactionDate?.slice(0, 10) || '');
            setNotes(editData.notes || '');
        }
    }, [editData]);

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) return alert("Session expired. Please log in again.");

        const payload = {
            name,
            email,
            transactionType,
            transactionAmount,
            tag,
            transactionDate,
            notes
        };

        try {
            if (editData) {
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/card/update/${editData._id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Card updated successfully!")
            } else {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/card/add`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success("Card added successfully!")
            }

            // Clear form and close
            setName('');
            setEmail('');
            setTransactionType('');
            setTransactionAmount('');
            setTag('');
            setTransactionDate('');
            setNotes('');
            { !editData && setAdded(!added) }
            onClose();
            { editData && sendUpdateToExploreCard(prev => prev + 1); }
        } catch (error) {
            if (error.response?.status === 409) {
                toast.warn("User already exists!");
            } else {
                console.error("Error submitting card:", error);
                toast.error("Unexpected error occured!");
            }
        }
    };

    return (
        <>
            {(addNew || editData) && (
                <>
                    <div className="h-screen fixed inset-0 bg-black opacity-60 z-40"></div>
                    <div className="max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full mx-auto rounded-2xl bg-[#18181b] border border-[#333] text-white shadow-xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{editData ? 'Edit Connection' : 'Add Connection'}</h2>
                            <button
                                onClick={onClose}
                                className="border border-[#444] px-3 py-1 rounded text-sm hover:underline"
                            >
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSave}>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    required
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-sm"
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-sm"
                                />
                            </div>

                            <div className="flex items-center mt-3 gap-2">
                                <select
                                    required
                                    value={transactionType}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-sm"
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
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] focus:outline-none bg-[#2a2a2a] text-sm"
                                />
                            </div>

                            <div className="flex items-center mt-3 gap-2">
                                <select
                                    required
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-sm"
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
                                    className="w-1/2 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-sm"
                                />
                            </div>

                            <textarea
                                name="notes"
                                required
                                placeholder="Write Notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full mt-3 px-3 py-2 rounded-lg border border-[#444] bg-[#2a2a2a] text-sm"
                                rows={4}
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-2 rounded-lg"
                            >
                                {editData ? "Update" : "Save"}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default AddCard;
