const express = require("express");
const mongoose = require("mongoose");
const hashing = require('../helpers/hashing.js');
const model = require('../models/UserModel');

//funcion para crear modelo
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pcno5.mongodb.net/booking-app?retryWrites=true&w=majority`;
mongoose.connect(url);//conectamos a la bbdd

const UserModel = model.get();



//validamos la contraseña y el email (y opcionalmente el id)
const checkParams = (req, witId = false) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw "contraseña y email obligatorios"
        }

        if (req.body.email.length < 10 || req.body.password.length < 10) {
            throw "Contraseña o email demasiado cortos";
        }

        if (witId == true) {
            if (!req.body._id) {
                throw "La id es obligatoria";
            }
        }
    } catch (err) {
        throw err;
    }

}

//handler para el registro
exports.register = (req, res) => {
    try {
        //validamos contraseña y email
        checkParams(req);

        //preparamos nuestro nuevo registro en la bbdd
        const newUser = UserModel({
            email: req.body.email,
            password: hashing.hashPassword(req.body.password),
            date: new Date()
        })

        //guardamos el nuevo registro
        newUser.save()
            .then((response) => {
                res.json({
                    status: "success",
                    data: {
                        _id: response._id,
                        email: response.email,
                        date: response.date
                    }
                });

            })
            .catch((err) => {

                res.json({
                    status: "failed",
                    error: err
                });

            });



    } catch (err) {
        res.json({
            status: "failed",
            error: err
        });
    }


};

//update user
exports.updateUser = (req, res) => {

    try {

        checkParams(req, true);

        UserModel.findOne({ _id: req.body._id }, (err, user) => {

            if (err) {
                res.json({
                    status: "failed",
                    error: err
                })
            }

            user.email = req.body.email;
            user.password = hashing.hashPassword(req.body.password);
            user.date = new Date();

            user.save()
                .then((data) => {
                    res.json({
                        status: "success",
                        data: data
                    })
                })
                .catch((err) => {
                    res.json({
                        status: "error",
                        error: err
                    });
                });
        })



    } catch (err) {
        res.json({
            status: "failed",
            error: err
        });
    }
}

//handler para el 
exports.deleteUser = (req, res) => {



    try {

        if(!req.body._id){
            throw "El _id es obligatorio";
        }

        UserModel.findOne({ _id: req.body._id }, (err, user) => {
            if (err) {
                res.json({
                    status: "failed",
                    error: err
                });
            }

            user.remove()
            .then((data)=>{
                res.json({
                    status: "success",
                    data: data
                })
            })
            .catch((err)=>{
                res.json({
                    status: "failed",
                    error: err
                })
            });
        });

    } catch (err) {
        res.json({
            status: "failed",
            error: err
        });
    }

}

//handler para el login
exports.login = (req, res) => {
    try {
        checkParams(req);

        UserModel.findOne({ email: req.body.email }, (err, user) => {

            try {
                if (err) {
                    throw err;
                }
                
                if (user.password != hashing.hashPassword(req.body.password)) {
                    throw "contraseña no valida"
                }
                

                res.json({
                    status: "success",
                    jwt: "87dsf78789sda78s78sa"
                });

            } catch (err) {
                res.json({
                    status: "failed",
                    error: err
                })
            }



        });

    } catch (err) {
        res.json({
            status: "failed",
            error: err
        })
    }
};
