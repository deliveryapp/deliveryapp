var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    mail: String,
    role: String,
    password: String,
    image_path: String
}, {
    collection: 'users'
});

UsersSchema.plugin(passportLocalMongoose, {usernameField: 'mail'});

UsersSchema.path('mail').validate(function (mail) {
    return mail.length;
}, 'Mail cannot be blank');

UsersSchema.path('firstName').validate(function (firstName) {
    return firstName.length;
}, 'First name cannot be blank');

UsersSchema.path('lastName').validate(function (lastName) {
    return lastName.length;
}, 'Last name cannot be blank');

UsersSchema.path('role').validate(function (role) {
    return role.length;
}, 'Role cannot be blank');

mongoose.model('Users', UsersSchema);