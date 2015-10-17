var dishes = require('./controllers/dishes');

module.exports = function (app) {
    //layouts:
    app.get('/', function (req, res) {
        res.send('Home');
    });

    app.get('/user', function (req, res) {
        res.render('user', {layout: false});
    });

    //rest:
    app.get('/dishes', dishes.get);
    app.post('/dishes', dishes.post);
    app.put('/dishes/:id', dishes.put);
    app.delete('/dishes/:id', dishes.destroy)
};