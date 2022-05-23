const express = require("express");
const jwt = require("jsonwebtoken");
const hotelModel = require("../models/hotel.model");
const router = express.Router();
const cityController = require("../controllers/city.controller");
const hotelController = require("../controllers/hotel.controller");
const roomController = require("../controllers/room.controller");
const roomModel = require("../models/room.model");
const userRouter = require("../routes/user.route");
router.get("/getAllCities", cityController.getAllCities);
router.post("/getHotelsByCity", hotelController.getHotelsByCity);

router.post("/getRoomsByHotel", roomController.getRoomsByHotel);
router.post("/getRoomDetailsById", roomController.getRoomDetailsById);

router.post("/getHotelById", hotelController.getHotelById);

router.get("/getAllHotels", authenticateJwt, (req, res) => {
  console.log(req);
  hotelModel
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/getAllRooms", authenticateJwt, (req, res) => {
  roomModel
    .find()
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
});

function authenticateJwt(req, res, next) {
  const header = req.header("authorization");
  const token = header && header.split(" ")[1];

  if (token == null || token === "") {
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
