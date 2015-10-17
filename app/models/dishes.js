var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishesSchema = new Schema({
    name: String,
    ingridients: String
}, {
    collection: 'dishes'
});

mongoose.model('Dishes', DishesSchema);