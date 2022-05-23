const cityModel = require("../models/city.model");

exports.addCity = function (req, res) {
  const city = new cityModel({
    name: req.body.name,
  })
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getAllCities = function (req, res) {
  cityModel
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
