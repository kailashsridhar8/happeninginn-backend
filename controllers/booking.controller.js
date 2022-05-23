const bookingModel = require("../models/booking.model");

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
