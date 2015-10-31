var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrdersSchema = new Schema({
    day: {
        type: Date,
        index: {
            unique: true
        }
    },
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

OrdersSchema.path('startDate').validate(function (day) {
    return day.length;
}, 'Day cannot be blank');


mongoose.model('Orders', OrdersSchema);