const express = require('express');
const mongoose = require('mongoose');
const model = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.isSigned = (req, res, next) => {
    const UserModel = model.get();
    if(!req.headers.authorization){
        res.json({
            status: 'failed',
            error: "Token no valido"
        }).end();
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            res.json({
                status: 'failed',
                error: "Token no valido"
            }).end();
            return;
        }
        
        UserModel.findOne({_id: decoded.id}, (err, user) => {
            try {
                
                if(user.email == decoded.email){
                    return next();
                }else{
                   throw "Token no valido"
                }

            } catch (err) {

                res.json({
                    status: 'failed',
                    error: err
                })
            }

        })
    })
    
    

    

}

