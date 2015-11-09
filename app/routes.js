var dishes = require('./controllers/dishes'),
    weeks = require('./controllers/weeks'),
    users = require('./controllers/users'),
    orders = require('./controllers/orders'),
    auth = require('./controllers/auth'),
    days = require('./controllers/days'),
    passport = require('passport');

module.exports = function (app) {
    //layouts:
    app.get('/lll', function (req, res) {
        res.render('new_login', {layout: false});
    });
    app.get('/', function (req, res) {
        res.send('Home');
    });
    app.get('/login', function (req, res) {
        res.render('login', {layout: false});
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/user', function (req, res) {
        /*if (!req || !req.user) {
            return res.redirect('/login');
        }*/
        res.render('user', {layout: false});
    });
    app.get('/admin', function (req, res) {
        /*if (!req || !req.user) {
            return res.redirect('/login');
        }*/
        res.render('admin', {layout: false});

    });
    app.get('/dishes-page', function (req, res) {
        res.render('dishes-page');
    });
    app.get('/weeks-page', function (req, res) {
        res.render('weeks-page');
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
    app.get('/users/current', users.current);
    app.post('/users/', users.post);
    app.delete('/users/:id', users.delete);

    /**
     * Days REST
     */
    app.delete('/days/:day', days.delete);
    app.get('/days/', days.get);
    app.post('/days/', days.post);
    app.put('/days/', days.put);

    /**
     * Orders REST
     */
    app.get('/orders/:userId/', orders.get);
    app.post('/orders/', orders.post);
    app.put('/orders/', orders.put);

    /**
     * Auth
     */
    app.post('/login/', passport.authenticate('local'), auth.login);
    app.post('/register/', auth.register);
};