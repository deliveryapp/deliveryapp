var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DishesSchema = new Schema({
    name: String,
    ingridients: String
}, {
    collection: 'dishes'
});

mongoose.model('Dishes', DishesSchema);