import cardModel from "../models/cards.model.js";

export const addNewCard = async (req, res) => {
    try {
        const { name, email, company, designation, tag, lastContacted, notes } = req.body;

        const alreadyAddded = await cardModel.findOne({ requestedBy: req.user._id, email });
        if (alreadyAddded) {
            return res.status(409).json({
                success: false,
                message: "Card already added"
            })
        }

        const newCard = new cardModel({
            name,
            email,
            company,
            designation,
            tag,
            lastContacted,
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
        const card = await cardModel.find({ requestedBy: req.user._id }).deleteOne({ id });
        if (!card) {
            return res.staus(500).json({
                success: false, 
                message: "Error deleting card from server side"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error in deleting the card!",
            error,
        })
    }
}