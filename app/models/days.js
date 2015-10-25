var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    DishesSchema = require('./dishes');

var DaysSchema = new Schema({
    day: Date,
    dishes: [DishesSchema]
}, {
    collection: 'days'
});

mongoose.model('Days', DaysSchema);