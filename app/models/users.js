var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    mail: String,
    days: Object,
    password: String
}, {
    collection: 'users'
});

UsersSchema.plugin(passportLocalMongoose);

mongoose.model('Users', UsersSchema);