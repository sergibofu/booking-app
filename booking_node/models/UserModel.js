const mongoose = require("mongoose");

exports.get = () => {
    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            index: true,
            unique: true
        },
        password:  String,
        date: Date,
        token: String
    });

    //si no existe creamos el modelo y luego lo retronamos, si existe, lo retornamos
    if(!mongoose.models['User']){
        return mongoose.model('User', userSchema);
    }else{
        return mongoose.models['User'];
    }
    
}