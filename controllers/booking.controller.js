const bookingModel = require("../models/booking.model");
const bookModel= require("../models/book.model");
exports.findBookingDetailsbyUserId = function (req, res) {
  bookingModel
    .find({ user_id: req.body.user_id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getAllBookings = function (req, res) {
  bookingModel
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};



//extra


exports.addBook=function(req,res){

  const book=new bookModel({
    room_id: req.body.room_id,
    room_type: req.body.room_type,

    hotel_name: req.body.hotel_name,

    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    price: req.body.price,
    user_id: req.body.user_id,


  }).save()
  .then((result) => {
    res.send(result);
    console.log("RoomBooking"+result);
  })
  .catch((err) => {
    res.send(err);
  });

}