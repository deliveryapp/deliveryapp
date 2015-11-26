var mongoose = require('mongoose'),
    Dishes = mongoose.model('Dishes'),
    _ = require('lodash');

function getErrorMessage(errors){
    return errors[Object.keys(errors)[0]].message;
}

exports.get = function (req, res){
    if (!_.isUndefined(req.query.id)) {
        //find by query param ids
        Dishes.find({
            '_id': {$in: req.query.id.split(',')}
        }, function (err, dishes) {
            if (err) return res.status(400).send(err.message);

            return res.send(dishes);
        })
    } else {
        //find all
        Dishes.find({}, function (err, dishes) {
            if (err) return res.status(400).send(err.message);

            res.send(dishes);
        });
    }
};

exports.post = function (req, res) {
    var dish = new Dishes({
        name: req.body.name,
        image_path: req.body.image_path,
        weight: req.body.weight,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });
    dish.save(function (err) {
        if (err) return res.status(400).send(getErrorMessage(err.errors));
        Dishes.findById(dish, function (err, dish) {
            if (err) return res.status(400).send(err.errors);
            res.send(dish);
        });
    });
};

exports.put = function (req, res) {
    Dishes.findById(req.params.id, function (err, dish) {
        if (err) return res.status(400).send(err.message);

        dish.name = req.body.name;
        dish.description = req.body.description;
        dish.weight = req.body.weight;
        dish.image_path = req.body.image_path;
        dish.price = req.body.price;
        dish.category = req.body.category;

        dish.save(function (err, dish) {
            if (err) return res.status(400).send(getErrorMessage(err.errors));
            res.send(dish);
        });
    });
};

exports.destroy = function (req, res) {
    Dishes.findById(req.params.id, function (err, dish) {
        if (err) return res.status(400).send(err.message);
        dish.remove(function (err) {
            if (err) return res.status(400).send(err.message);
            res.send('OK');
        });
    });
};