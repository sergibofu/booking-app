const mongoose = require("mongoose");

exports.get = () => {
    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            select: false,
            index: true,
            unique: true
        },
        password: String,
        date: Date
    });
    return mongoose.model('User', userSchema);
}