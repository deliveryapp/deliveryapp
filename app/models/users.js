var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    mail: {
        type: String,
        index: {
            unique: true
        }
    },
    role: String
}, {
    collection: 'users'
});

UsersSchema.plugin(passportLocalMongoose);

UsersSchema.path('mail').validate(function (mail) {
    return mail.length;
}, 'Mail cannot be blank');

UsersSchema.path('role').validate(function (role) {
    return role.length;
}, 'Role cannot be blank');

mongoose.model('Users', UsersSchema);