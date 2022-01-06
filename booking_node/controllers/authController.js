const express = require("express");
const mongoose = require("mongoose");


//creamos nuestro modelo
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pcno5.mongodb.net/booking-app?retryWrites=true&w=majority`;
mongoose.connect(url);//conectamos a la bbdd
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    date: Date
});
const UserModel = mongoose.model('User', userSchema);

//handler para el registro
exports.register = (req, res) => {

};

//handler para el login
exports.login = (req, res) => {
    res.send('hi there');
};
