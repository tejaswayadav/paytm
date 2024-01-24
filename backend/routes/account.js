const { Router } = require('express');
const { authMiddleware } = require('../middleware/middleware');
const { Account } = require('../db');
const { startSession } = require('mongoose');

const router = Router();

router.get('/balance', authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    }, 'balance');

    return res.status(200).json({
        balance: Number(account.balance)
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await startSession();
    session.startTransaction();

    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session(session);
    const toAccount = await Account.findOne({
        userId: req.body.to
    }).session(session);

    if (!fromAccount || !toAccount) {
        return res.status(400).json({
            message: 'Invalid Account'
        })
    }

    if (fromAccount.balance < req.body.amount) {
        return res.status(400).json({
            message: 'Insufficient Balance'
        })
    }

    await Account.findOneAndUpdate({
        userId: req.userId
    }, {
        balance: fromAccount.balance - req.body.amount
    }).session(session)

    await Account.findOneAndUpdate({
        userId: req.body.to
    }, {
        balance: toAccount.balance + req.body.amount
    }).session(session)

    await session.commitTransaction();
    return res.status(200).json({
        message: 'Transfer successfull'
    })
})

module.exports = router