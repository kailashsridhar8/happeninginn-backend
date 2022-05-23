const roomModel = require("../models/room.model");
const hotelModel = require("../models/hotel.model");
const bookingModel = require("../models/booking.model");

exports.getRoomsByHotel = function (req, res) {
  hotelModel
    .findById(req.body.id)
    .then((result) => {
      res.json(result.rooms);
    })
    .catch((err) => {
      res.json("error");
    });
};

exports.addRoom = function (req, res) {
  const room = new roomModel({
    roomtype: req.body.roomtype,

    price: req.body.price,

    capacity: req.body.capacity,
    ratings: req.body.ratings,

    image: req.body.image,
    hotel_id: req.body.hotel_id,
  })
    .save()
    .then((result) => {
      res.send(result);

      hotelModel
        .findOne({ _id: req.body.hotel_id }, function (err, hotel) {
          hotel.rooms.push(result);
          hotel.save();
        })
        .then((data) => {
          res.json(data);
        })

        .catch((err) => {
          console.log("Error");
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateRoom = function (req, res) {
  roomModel.findOneAndUpdate(
    { _id: req.body.room_id },
    {
      roomtype: req.body.roomtype,

      price: req.body.price,

      capacity: req.body.capacity,
      ratings: req.body.ratings,

      image: req.body.image,
    },
    function (err, data) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(data);
      }
    }
  );
};

exports.getRoomDetailsById = function (req, res) {
  roomModel
    .findById(req.body.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json("error");
    });
};

exports.bookRoom = function (req, res) {
  const booking = new bookingModel({
    room_id: req.body.room_id,
    room_type: req.body.room_type,

    hotel_name: req.body.hotel_name,

    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    price: req.body.price,
    user_id: req.body.user_id,
  })
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addBookingToRoom = function (req, res) {
  roomModel
    .findOne({ _id: req.body.room_id }, function (err, room) {
      room.bookings.push(req.body.bookings);

      room.save();
    })
    .then((data) => {
      res.json(data);
    })

    .catch((err) => {
      console.log("Error");
    });
};

exports.deleteRoomsofDeletedHotel = function (req, res) {
  roomModel.remove({ hotel_id: req.body.hotel_id }, function (err, data) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(data);
    }
  });
};

exports.deleteRoom = function (req, res) {
  roomModel.findByIdAndDelete(req.body.room_id, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
