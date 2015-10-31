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

WeeksSchema.path('startDate').validate(function (startDate) {
    return startDate.length;
}, 'StartDate cannot be blank');


mongoose.model('Weeks', WeeksSchema);