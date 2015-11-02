var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DaysSchema = new Schema({
    day: Date,
    dishes: [{
        id: String
    }]
}, {
    collection: 'days'
});

mongoose.model('Days', DaysSchema);