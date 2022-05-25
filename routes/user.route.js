const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user.controller");
const hotelController = require("../controllers/hotel.controller");
const roomController = require("../controllers/room.controller");
const bookingController = require("../controllers/booking.controller");
const jwt = require("jsonwebtoken");
const refreshSchema = require("../models/refreshToken.js");
const userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
require("dotenv").config();
router.post("/cancelBooking",userController.cancelBooking);
router.post("/bookRoom", roomController.bookRoom);
router.post(
  "/findBookingDetailsbyUserId",
  bookingController.findBookingDetailsbyUserId
);

router.post("/addBookingToRoom", roomController.addBookingToRoom);

router.post("/addBook",bookingController.addBook);
// router.post("/signup", async (req, res, next) => {
//   const username = req.body.username;
//   const phone = req.body.phone;

//   const userObject = await userModel.findOne({ email: req.body.email });

  // if (userObject) {
  //   return res.json({
  //     message: "Email already registered",
  //   });
//   } else {

//    const password=req.body.password;
//    const email=req.body.email;
//    const phone=req.body.phone;
//    console.log(password+"pass");

//     const hash = await bcrypt.hash(password, 10);
//     console.log(hash+"hashpass");
//     const model = new userModel({
//       username: username,
//       email: email,
//       phone: phone,
//       password: hash,
//     });
//     model
//       .save()
//       .then((result) =>{
//         console.log(req.body.password);
        // res.json({
        //   message: "Registered Successfully",
        // })

//       }
   
//       )
//       .catch((err) => res.send(err));
//   }
// });





router.post("/signup",register,async(req,res)=>{
  const newUser=req.newUser;
  const userObject = await userModel.findOne({ email: req.body.email });
  if (userObject) {
    return res.json({
      message: "Email already registered",
    });
  }

  try{
      await newUser.save();
      res.json({
        message: "Registered Successfully",
      })
  }catch(err){
      res.send(err)
  }
});

async function register(req,res,next){
  const newUser= new userModel(
    {username:req.body.username,email:req.body.email,
    password:req.body.password,phone:req.body.phone
})
  const hashed=await bcrypt.hash(newUser.password,10);
  newUser.password=hashed;
  req.newUser=newUser;
  next()
}







router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      console.log(user+"err");
      if (err || !user) {
        let message = info.message;
        const error = new Error("An error occurred.");

        return res.send({ msg: message });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };

        let token = "Bearer " + generateAccessToken(body) + " "; //accesstoken to check whetehr login
        let refreshToken = jwt.sign(
          { user: body },
          process.env.REFRESH_SECRET,
          { expiresIn: "60d" }
        );
        const ref_token = new refreshSchema({ refreshToken: refreshToken });
        await ref_token.save();
        token += refreshToken;
        const msg = "Logged In";
        return res.send({ token, msg, _id: user._id, role: user.role });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.delete("/removeToken", async (req, res) => {
  let ref_Token = req.query.refreshToken;
  await refreshSchema.deleteOne({ refreshToken: ref_Token });
  res.send("Deleted");
});

router.get("/getToken", async (req, res) => {
  let ref_Token = req.query.refreshToken;

  console.log("reft " + req.query.refreshToken);
  if (ref_Token == null) return res.send("Empty Token");
  let db_ref_Token = await refreshSchema.findOne({ refreshToken: ref_Token });
  if (db_ref_Token == null) return res.send("Please Login");
  if (db_ref_Token.refreshToken !== ref_Token) return res.send("Please Login");
  jwt.verify(ref_Token, process.env.REFRESH_SECRET, (err, refreshObject) => {
    if (err) {
      return res.send(err.message);
    }
    if (refreshObject == null) {
      return res.send("Refresh JWT Expired");
    }

    let token =
      "Bearer " + generateAccessToken(refreshObject.user) + " " + ref_Token;

    return res.send({ token: token, role: refreshObject.user.role });
  });
});

function generateAccessToken(body) {
  return jwt.sign({ user: body }, process.env.TOP_SECRET, { expiresIn: "30m" });
}

function authenticateJwt(req, res, next) {
  const header = req.header("authorization");
  const token = header && header.split(" ")[1];
  if (token == null) {
    return res.send("please log in");
  }
  jwt.verify(token, process.env.TOP_SECRET, (err, payload) => {
    if (err) {
      return res.send("IV_JWT");
    }
    req.user = payload.user;
    next();
  });
}

module.exports = router;
