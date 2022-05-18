const hotelModel = require("../models/hotel.model");

exports.addHotel = function (req, res) {

  const hotel = new hotelModel({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    contact_no: req.body.contact_no,
    image: req.body.image,
  })
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getHotelsByCity = function (req, res) {
  hotelModel
    .find({ city: req.body.city })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Error");
    });
};


exports.getHotelById = function (req, res) {
  hotelModel.findById(req.body.id).then((result)=>{
    // console.log(result);
    res.json(result);
  })
  .catch((err)=>{
    res.send(err);
  })
};


exports.getAllHotels = function (req, res) {
  hotelModel
    .find()
    .then((result) => {
      // console.log("hotels" + result[0].name);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteHotel=function(req, res) {
  hotelModel.findByIdAndDelete(req.body.hotel_id,function(err, result) {
    if(err) {
      console.log(err);
      res.send(err);
    }
    else{
      console.log(result);
      res.send(result);
    }
  })
}


exports.updateHotel= function (req, res) {

  hotelModel.findOneAndUpdate({_id:req.body.hotel_id},{

    name:req.body.hotel_name, address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    contact_no: req.body.contact_no,
    image: req.body.image,
    breakfast: req.body.breakfast,
    offer: req.body.offer,
  
  }, function(err, data) {
      if(err){
        console.log(data+"Update Feature");
        return res.send(err);
      }
      else{
        console.log(data+"Update Feature");
        return res.send(data);
      }
    })

}


