// models/User.js

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    street: String,
    city: String,
    region: String,
    zip: String,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)