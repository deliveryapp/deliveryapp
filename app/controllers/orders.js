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
    if (!_.isUndefined(req.query.day)) {
        var day = req.query.day.split(',');
        Orders.find({
            'day': {$in: day}
        }, function (err, orders) {
            if (err) return res.status(400).send(err);

            populateOrderDishes(orders, res);
        });
    } else {
        Orders.find({}, function (err, orders) {
            if (err) return res.status(400).send(err);
            populateOrderDishes(orders, res);
            //return res.send(orders);
        });
    }

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

        order[0].paymentStatus = req.body.paymentStatus;
        if(req.body.dishes!==undefined) {
            order[0].dishes = req.body.dishes;

            for(var i=0;i<req.body.dishes.length;i++)
            {
                order[0].dishes[i].dish.id = req.body.dishes[i].dish._id;
                order[0].dishes[i].quantity = req.body.dishes[i].quantity;
            }
        }
        else {
            order[0].dishes = [];
        }
        console.log(req.body.dishes);
        console.log("\r\n");
        //order[0]._id = req.body._id;
        //var orderRes = order[0];
        console.log(order[0]);
        order[0].save(function (err, orderRes) {
            if (err) return res.status(400).send(err);
            return res.send(orderRes);
        });
    });
};