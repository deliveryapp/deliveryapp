var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WeeksSchema = new Schema({
    startDate: {
        type: Date,
        index: {
            unique: true
        }
    },
    days: [Date]
}, {
    collection: 'weeks',
    id: false
});

mongoose.model('Weeks', WeeksSchema);