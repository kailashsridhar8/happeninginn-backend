const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel.controller");
const roomController = require("../controllers/room.controller");
const cityController = require("../controllers/city.controller");
const bookingController = require("../controllers/booking.controller");
router.post("/addHotel", hotelController.addHotel);
router.post("/addRoom", roomController.addRoom);
router.post("/addCity", cityController.addCity);
router.post("/deleteHotel", hotelController.deleteHotel);
router.post("/deleteRoom", roomController.deleteRoom);
router.post("/updateHotel", hotelController.updateHotel);
router.post("/updateRoom", roomController.updateRoom);
router.post(
  "/deleteRoomsofDeletedHotel",
  roomController.deleteRoomsofDeletedHotel
);
router.get("/getAllBookings", bookingController.getAllBookings);

module.exports = router;
