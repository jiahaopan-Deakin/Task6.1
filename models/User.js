const mongoose = require("mongoose")
const validator = require("validator")
const iServiceSchema = new mongoose.Schema({
    _country:{type: String,
            required: true},
    _firstname:{type: String,
        required: true},
    _lastname:{type: String,
        required: true},
    _email:{type: String,
        validate(value){
            if(!validator.isEmail(value)){
                res.send("Email is not valid!")
                throw new Error('Email is not valid!')
            }
        }
    },
    _password:{type: String,
        minLength:8},
    _repassword:{type: String,},
    _address:{type: String,
        required: true},
    _city:{type: String,
        required: true},
    _state:{type: String,
        required: true},
    _postcode:Number,
    _phonenumber:Number
})

module.exports = mongoose.model('IService', iServiceSchema)