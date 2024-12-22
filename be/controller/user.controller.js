const User = require('../model/User');
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

userController.login = async (req, res) => {
    try{
      const {email, password} = req.body;
      const user = await User.findOne({email});
      if(user) {
         const isMatch = bcrypt.compareSync(password, user.password);
         if(isMatch){
            const token = user.generateToken();
            res.status(200).json({status:true, message:'로그인 성공',user, token});
         }else{
          throw new Error('비밀번호가 틀렸습니다.');
         }
      }
    }catch(err){
        console.log("Error:", err);
        res.status(400).json({ status: false, error: err.message });
    }
}  

module.exports = userController;