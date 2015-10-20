var mongoose = require('mongoose');
var Dishes = mongoose.model('Dishes');

exports.get = function (req, res){
    Dishes.find({}, function (err, dishes) {
        if (err) return res.send(err);

        res.send(dishes);
    });
};

exports.post = function (req, res) {
    var dish = new Dishes({
        name: req.body.name,
        ingridients: req.body.description
    });
    dish.save(function (err) {
        if (err) return res.send(err);
        Dishes.findById(dish, function (err, dish) {
            if (err) return res.send(err);
            res.send(dish);
        });
    });
};

exports.put = function (req, res) {
    Dishes.findById(req.params.id, function (err, dish) {
        if (err) return res.send(err);
        dish.name = req.body.name;
        dish.ingridients = req.body.description;
        dish.save(function (err, dish) {
            if (err) return res.send(err);
            res.send(dish);
        });
    });
};

exports.destroy = function (req, res) {
    Dishes.findById(req.params.id, function (err, dish) {
        if (err) return res.send(err);
        dish.remove(function (err) {
            if (err) return res.send(err);
            res.send('OK');
        });
    });
};