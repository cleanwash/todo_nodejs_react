const User = require("../model/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userController = {};

userController.signup = async (req, res) => {
   try{
    const { email, password, name } = req.body;
   const user = await User.findOne({email});
   if(user){
    res.status(400).json({status:false, error:'이미 가입된 이메일입니다.'});
   }
   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password, salt);
   const newUser = new User({email, password:hash, name});
   await newUser.save();
    res.send('회원가입 완료');
   }catch(err){
    res.status(400).json({status:false, error:err});
   }
};

module.exports = userController;