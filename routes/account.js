const express = require('express');
const authMiddleware = require('../middlewares');

const { Account } = require('../db');
const { default: mongoose } = require('mongoose');


const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient account"
        });
    }

    // Perform Transaction
    await Account.updateOne(
        { userId: req.userId }, // Filter: Find the document by userId
        { $inc: { balance: -amount } } // Update: Decrease the balance field
    ).session(session);

    await Account.updateOne(
        { userId: to }, // Filter: Find the document by userId
        { $inc: { balance: amount } } // Update: Decrease the balance field
    ).session(session);

    // Commit Transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
    
});

module.exports = router;