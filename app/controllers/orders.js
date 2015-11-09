var mongoose = require('mongoose'),
    Orders = mongoose.model('Orders');

exports.get = function (req, res) {
    var userId = req.param.userId,
        day = req.query.day.split(',');
    Orders.find({
        'userId': userId,
        'day': {$in: day}
    }, function (err, orders) {
        if (err) return res.status(400).send(err);

        //TODO: add dish model inside orders

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