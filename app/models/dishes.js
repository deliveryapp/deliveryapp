var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DishesSchema = new Schema({
    name: {type: String, default: ''},
    image_path: {type: String, default: 'user.jpg'},
    weight: {type: String, default: ''},
    description: {type: String, default: ''},
    price: {type: String, default: ''},
    category: {type: String, default: ''}
}, {
    collection: 'dishes'
});

DishesSchema.path('name').validate(function (name) {
    return name.length;
}, 'Name cannot be blank');

DishesSchema.path('description').validate(function (description) {
    return description.length;
}, 'Description cannot be blank');

DishesSchema.path('price').validate(function (price) {
    return price.length;
}, 'Price cannot be blank');

DishesSchema.path('category').validate(function (category) {
    return category.length;
}, 'Category cannot be blank');

mongoose.model('Dishes', DishesSchema);