var mongoose = require('mongoose').set('debug', true),
    Schema = mongoose.Schema;

var OrdersSchema = new Schema({
    userId: String,
    day: {
        type: Date,
        index: {
            unique: true
        }
    },
    paymentStatus: Boolean,
    dishes: [{
        dish: {
            id: String
        },
        quantity: {
            type: Number
        }
    }]
}, {
    collection: 'orders'
});

OrdersSchema.path('day').validate(function (day) {
    return day.length;
}, 'Day cannot be blank');

OrdersSchema.path('userId').validate(function (day) {
    return day.length;
}, 'User id cannot be blank');

mongoose.model('Orders', OrdersSchema);