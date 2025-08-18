import cardModel from "../models/cards.model.js";

export const addNewCard = async (req, res) => {
    try {
        const { name, email, transactionType, transactionAmount, tag, transactionDate, notes } = req.body;

        const newEmail = email.toLowerCase();

        const newCard = new cardModel({
            name,
            email: newEmail,
            transactionType,
            transactionAmount,
            tag,
            transactionDate,
            notes,
            requestedBy: req.user._id
        });

        await newCard.save();

        return res.status(201).json({
            success: true,
            message: 'Card created successfully!',
            card: newCard
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error in creating card',
            error
        });
    }
}

export const getAllCards = async (req, res) => {
    try {
        const cards = await cardModel.find({ requestedBy: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error in getting the cards!",
            error,
        });
    }
};

export const deleteCard = async (req, res) => {
    try {
        const { id } = req.params; 
        const result = await cardModel.deleteOne({ _id: id, requestedBy: req.user._id }); 

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No card found or unauthorized",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Card deleted successfully",
        });
    } catch (error) {
        console.error("Delete card error:", error);
        res.status(500).json({
            success: false,
            message: "Server error in deleting the card!",
        });
    }
};

export const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            transactionType,
            transactionAmount,
            tag,
            transactionDate,
            notes,
        } = req.body;

        const updatedCard = await cardModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                transactionType,
                transactionAmount,
                tag,
                transactionDate,
                notes,
            },
            { new: true } 
        );

        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(updatedCard);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const searchCard = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await cardModel.find({email: email, requestedBy: req.user._id});
        if(result){
            res.status(200).json({
                success: true,
                message: "Card found successfully".
                result
            })
        }
    } catch (error) {
        console.error('Search error', error);
        res.status(500).json({ 
            message: 'Error searching card', 
            success: false,
            error
        })
    }
}