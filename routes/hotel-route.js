const express=require('express');
const jwt = require('jsonwebtoken');
const hotelModel = require("../models/hotel.model");
const router= express.Router();
const cityController=require('../controllers/city.controller');
const hotelController=require('../controllers/hotel.controller');
const roomController=require('../controllers/room.controller');
const  roomModel=require('../models/room.model');
const userRouter=require('../routes/user.route');
router.get('/getAllCities', cityController.getAllCities);
router.post('/getHotelsByCity',hotelController.getHotelsByCity);
// router.get('/getAllHotels',hotelController.getAllHotels);
router.post('/getRoomsByHotel',roomController.getRoomsByHotel);
router.post('/getRoomDetailsById',roomController.getRoomDetailsById);
// router.get('/getAllRooms',roomController.getAllRooms);
router.post('/getHotelById',hotelController.getHotelById);



router.get('/getAllHotels',authenticateJwt,(req, res)=>{
  console.log(req);
  hotelModel
  .find()
  .then((result) => {
    console.log("hotels" + result[0].name);
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
});








router.get('/getAllRooms',authenticateJwt,(req,res)=>{

  roomModel
  .find()
  .then((result) => {
    
   return res.send(result);
  })
  .catch((err) => {
   return  res.send(err);
  });


});









//changes needed
// router.post('/getRoomsByHotel',authenticateJwt,(req, res)=> {


//     hotelModel
//       .findById(req.body.id)
//       .then((result) => {
//           console.log("resultsss"+result);
//        return res.json(result.rooms);
//       })
//       .catch((err) => {
//        return res.json(err.message);
//       });
//   });


  function authenticateJwt(req,res,next){
    const header=req.header('authorization')
    const token=header && header.split(' ')[1];
  
    if(token==null||token===''){
      console.log(token+"Tokenn"); 
      return res.send("please log in")
    }
    jwt.verify(token,process.env.TOP_SECRET,(err,payload)=>{
      if(err){
        return res.send("IV_JWT")
      }
      req.user=payload.user
      next()
    })
  }





module.exports=router;