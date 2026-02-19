import mongoos from "mongoose"

const userSchema = mongoos.Schema( //schema for user collection
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: 'customer'
        },
        blockedOrNot: {
            type: Boolean,
            default: false
        },
        Image: {
            type: String,
            required: false,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        }
    }
)

const User = mongoos.model('Users', userSchema); //model for user collection

export default User;