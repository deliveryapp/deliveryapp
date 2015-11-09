var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    mail: String,
    role: String,
    password: String
}, {
    collection: 'users'
});

UsersSchema.plugin(passportLocalMongoose, {usernameField: 'mail'});

UsersSchema.path('mail').validate(function (mail) {
    return mail.length;
}, 'Mail cannot be blank');

UsersSchema.path('role').validate(function (role) {
    return role.length;
}, 'Role cannot be blank');

mongoose.model('Users', UsersSchema);