var mongoose = require('mongoose'),
    Orders = mongoose.model('Orders'),
    Dishes = mongoose.model('Dishes'),
    async = require('async'),
    _ = require('lodash');

exports.get = function (req, res) {
    var userId = req.params.userId;
    if (!_.isUndefined(req.query.day)) {
        var day = req.query.day.split(',');
        Orders.find({
            'userId': userId,
            'day': {$in: day}
        }, function (err, orders) {
            if (err) return res.status(400).send(err);

            populateOrderDishes(orders, res);
        });
    } else {
        Orders.find({
            'userId': userId
        }, function (err, orders) {
            if (err) return res.status(400).send(err);

            populateOrderDishes(orders, res);
        });
    }
};

var populateOrderDishes = function (orders, res) {
    async.map(orders, function (order, callback) {
        async.map(order.dishes, function (dish, callbackNested) {
            Dishes.findById(dish.dish.id, function (err, fullDish) {
                var unlinkedDish = dish.toJSON();
                unlinkedDish.dish = fullDish;
                callbackNested(null, unlinkedDish);
            });
        }, function (err, fullDishWithQuantity) {
            if (err) return res.status(400).send(err);
            var unlinkedOrder = order.toJSON();
            unlinkedOrder.dishes = fullDishWithQuantity;
            callback(null, unlinkedOrder);
        });
    }, function (err, orders) {
        if (err) return res.status(400).send(err);
        return res.send(orders);
    });
};

exports.getAll = function (req, res) {
    Orders.find({}, function (err, orders) {
        if (err) return res.status(400).send(err);

        return res.send(orders);
    });
};

exports.post = function (req, res) {
    var order = new Orders({
        userId: req.body.userId,
        day: req.body.day,
        paymentStatus: req.body.paymentStatus,
        dishes: req.body.dishes
    });

    order.save(function (err) {
        if (err) return res.status(400).send(err);
        Orders.findById(order, function (err, order) {
            if (err) return res.status(400).send(err);
            res.send(order);
        });
    });
};

exports.put = function (req, res) {
    Orders.find({
        'userId': req.body.userId,
        'day': req.body.day
    }, function (err, order) {
        if (err) return res.status(400).send(err);

        order.paymentStatus = req.body.paymentStatus;
        order.dishes = req.body.dishes;

        order.save(function (err, order) {
            if (err) return res.status(400).send(err);
            return res.send(order);
        });
    });
};