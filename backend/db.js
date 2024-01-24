const { Schema, model, connect } = require('mongoose');

connect(process.env.MONGO_URL);

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const AccountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        required: true,
        trim: true
    }
})

const User = model('User', UserSchema);

const Account = model('Account', AccountSchema);

module.exports = {
    User,
    Account
}