const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },

    password: 
    {
        type: String,
        required: true,
        minLength: 8,
    },

    isVerified: 
    {
        type: Boolean,
        default: false
    }
});

//Virtual for getting full name - Virtuals are not persisted to DB.
UserSchema.virtual('fullName').get(function() {
    return this.firstname + ' ' + this.lastname;
});

const User = mongoose.Model('User', UserSchema);

module.exports = User;