const { object, string } = require('zod');

const CreateUser = object({
    firstName: string().max(50),
    lastName: string().max(50),
    userName: string().min(3).max(30).email(),
    password: string().min(6)
})

const SigninUser = object({
    userName: string().email(),
    password: string()
})

const UpdateUser = object({
    firstName: string().max(50).optional(),
    lastName: string().max(50).optional(),
    password: string().min(6).optional()
})

module.exports = {
    CreateUser,
    SigninUser,
    UpdateUser
}