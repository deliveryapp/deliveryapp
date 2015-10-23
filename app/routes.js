var dishes = require('./controllers/dishes');

module.exports = function (app) {
    //layouts:
    app.get('/', function (req, res) {
        res.send('Home');
    });

    app.get('/user', function (req, res) {
        res.render('user', {layout: false});
    });

    app.get('/admin', function (req, res) {
        res.render('admin', {layout: false});
    });
    app.get('/dishes-page', function (req, res) {
        res.render('dishes-page');
    });

    //rest:
    app.get('/dishes', dishes.get);
    app.post('/dishes', dishes.post);
    app.put('/dishes/:id', dishes.put);
    app.delete('/dishes/:id', dishes.destroy)
};