var dishes = require('./controllers/dishes'),
    weeks = require('./controllers/weeks'),
    users = require('./controllers/users'),
    orders = require('./controllers/orders'),
    days = require('./controllers/days'),
    passport = require('passport'),
    _ = require('lodash');

module.exports = function (app) {
    //layouts:
    app.get('/', function (req, res) {
        res.send('Home');
    });
    app.get('/login', function (req, res) {
        res.render('login', {layout: false});
    });
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    var handleRole = function (req, res) {
        /*if (req.isUnauthenticated()) {
         return res.redirect('/login');
         }
         var roleStrategy = {
         'user': function (res) {
         return res.render('user', {layout: false});
         },
         'admin': function (res) {*/
        return res.render('user', {layout: false});
        //return res.render('admin', {layout: false});
        //}
        //};
        /*
         if (!_.isUndefined(roleStrategy[req.user.role])) {
         roleStrategy[req.user.role](res);
         } else {
         return res.status(403).send('Unknown role');
         }*/
    };

    app.get('/user', handleRole);
    app.get('/admin', handleRole);
    app.get('/dishes-page', function (req, res) {
        res.render('dishes-page');
    });
    app.get('/weeks-page', function (req, res) {
        res.render('weeks-page');
    });
    app.get('/orders-page', function (req, res) {
        res.render('orders-page');
    });

    /**
     * Dishes REST
     */
    app.get('/dishes', dishes.get);
    app.post('/dishes', dishes.post);
    app.put('/dishes/:id', dishes.put);
    app.delete('/dishes/:id', dishes.destroy);

    /**
     * Weeks REST
     */
    app.get('/weeks/', weeks.get);
    app.get('/weeks/:startDate', weeks.getByDate);
    app.post('/weeks/:startDate', weeks.post);

    /**
     * Users REST
     */
    app.get('/users/', users.get);
    app.get('/users/:id', users.getById);
    app.put('/users/:id', users.put);
    app.post('/users/', users.post);
    app.delete('/users/:id', users.delete);

    /**
     * Days REST
     */
    app.delete('/days/:day', days.delete);
    app.get('/days/', days.get);
    app.post('/days/', days.post);
    app.put('/days/', days.put);
    app.put('/days/:id', days.put);
    //app.delete('/days/:id', days.destroy);

    /**
     * Orders REST
     */
    app.get('/orders/', orders.getAll);
    app.get('/orders/:userId/', orders.get);
    app.post('/orders/', orders.post);
    app.put('/orders/', orders.put);
    app.put('/orders/:userId/:id', orders.put);

    /**
     * Auth
     */
    app.post('/login/', passport.authenticate('local'), function (req, res) {
        res.status(200).send('OK');
    });
};