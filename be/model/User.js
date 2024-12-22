const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{timestamps: true});

// userSchema.methods.toJSON = function(){
//   return this
// }

userSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.password;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  }

userSchema.methods.generateToken =  function(){
    const token =  jwt.sign({_id:this._id}, process.env.JWT_SECRET,{ expiresIn: '1d' });
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
