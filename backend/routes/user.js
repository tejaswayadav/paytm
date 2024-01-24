const { Router } = require('express');
const { CreateUser, SigninUser, UpdateUser } = require('../types');
const { User, Account } = require('../db');
const { sign } = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/middleware');

const router = Router();

router.post('/signup', async (req, res) => {
    const parseUser = CreateUser.safeParse(req.body);
    const existingUser = await User.findOne({
        userName: req.body.userName
    })
    if (!parseUser.success || existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password
    })

    const jwt = getJwt(user._id);

    await Account.create({
        userId: user._id,
        balance: Math.floor(Math.random() * 10000)
    })

    return res.status(200).json({
        message: 'User Created Successfully',
        token: jwt
    })
})

router.post('/signin', async (req, res) => {
    const existingUser = await User.findOne({
        userName: req.body.userName
    })
    if (!existingUser || !SigninUser.safeParse(req.body).success) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const jwt = getJwt(existingUser._id);
    return res.status(200).json({
        token: jwt
    })
})

function getJwt(id) {
    return sign({ id }, process.env.JWT_SECRET);
}

// Update User functionality
router.put('/', authMiddleware, async (req, res) => {

    if (!UpdateUser.safeParse(req.body).success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.findOneAndUpdate({
        _id: req.userId
    }, req.body)

    return res.status(200).json({
        message: "Updated successfully"
    })
})

// Get Bulk User functionality
router.get('/bulk', authMiddleware, async (req, res) => {

    const users = await User.find({}, '_id firstName lastName');

    return res.status(200).json({
        users: users
    })
})

module.exports = router;