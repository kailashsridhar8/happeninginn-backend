var bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const bookingModel=require("../models/booking.model");
const passport = require("passport");
const roomModel = require("../models/room.model");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },

    async (req, email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
      


        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);
      
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);


exports.cancelBooking=function(req,res){ 

  bookingModel.deleteOne({ user_id: req.body.user_id, fromDate:req.body.fromDate,toDate:req.body.toDate }, function (err, data) {
    if (err) {
       res.send(err);
    } else {
      console.log(data);
     
    }
    
  }).then((result)=>{

console.log(result+"Res");
    
roomModel.findByIdAndUpdate(
  req.body.room_id,
    {
      $pull: {
        bookings: {
          fromDate:req.body.fromDate,
        toDate:req.body.toDate,
        user_id:req.body.user_id
        },
      },
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else
       {
     
        res.send(result);
      }
    }
  );





  }).catch((err)=>{

    res.send(err);
  })




}