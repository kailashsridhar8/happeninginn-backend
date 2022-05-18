var bcrypt = require("bcryptjs");
const userModel = require('../models/user.model');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;







passport.use(
    'signup',
    new localStrategy(
      {
       
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        
      },
      async (req,email, password, done) => {
        try {
            const username=req.body.username;
             const userObject=await userModel.findOne({ email });



             if (userObject) {
             
                return done(null, false, { message: 'Email Error' });
              }


            const user = await userModel.create({username,email, password });
          

           
          return done(null, user,{ message: "Hello user" });
        } catch (error) {

          done(error);
        }
      }
    )
  );
 




passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req,email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
      
            return done(null, false, { message: 'Wrong Password' });

          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            
          return done(error);
        
        }
      }
    )
  );

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          console.log("error "+done(error));
          done(error);
          
        }
      }
    )
  );
























// exports.loginUser= async (req,res)=>{

//     try{
//         const user = await userModel.findOne({username:req.body.username});

//         if(user){
//             const cmp=await bcrypt.compare(req.body.password,user.password);
//             if(cmp){
//                     //jwt
//                     res.send("Logged In");
//             }
//             else{
//                 res.send("Wrong Username or Password");
//             }
//         }
//         else{
//             res.status(404).send("User not found");
//         }
//     }
//     catch(error){
//         res.status(500).send("Internal Server error occured");

//     }

// }

// exports.getAllUsers('/usersList', async (req, res) => {

//     const users = await userModel.find({});
    
//     const userMap = {};
//     users.forEach((user) => {
//         userMap[user._id] = user;
//     });
    
//     res.send(userMap);
    
//     });






