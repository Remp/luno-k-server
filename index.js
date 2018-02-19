const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const mongoQueries = require('./mongodb/queries');
const {conStr} = require('./config');

const port = process.env.PORT || 3000
const store = new MongoDbStore({
    uri: conStr,
    collection: 'sessions'
});

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(session({
    secret: 'top secret',
    store: store,
    resave: true,
    saveUninitialized: true
}))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.post('/auth', (req, res) => {
    req.session.clientId = req.body;
    res.end();
})
app.post('/sign_out', (req, res) => {
    delete req.session.clientId;
})
app.get('/fav', (req, res) => {
    const clientId = req.session.clientId
    if (clientId){
        mongoQueries.getFavorites(req, res);
    }
})
app.put('/fav', (req, res) => {
    if (req.session.clientId){
        mongoQueries.addFavorite(req, res);
    }   
})
app.delete('/fav', (req, res) => {
    const id = req.session.clientId
    if (id){
        mongoQueries.removeFavorite(req, res);
    }    
})
app.post('/checkFav', (req, res) => {
    mongoQueries.checkFavorite(req, res);    
})
app.listen(port, () => {
    console.log('server run on port ' + port);
});