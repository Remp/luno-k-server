const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const session = require('express-session');

const port = 8080;

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(session({
    secret: 'dsfsfwepefwkwfwe'
}))
// app.get('/', (req, res) => {
//     console.log('yezzzzzz');
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });
app.post('/auth', (req, res) => {
    req.session.clientId = req.body;
    res.end();
})
app.post('/sign_out', (req, res) => {
    delete req.session.clientId;
})
app.get('/fav', (req, res) => {
    const clientId = req.session.clientId
    if (clientId)
        res.send(JSON.stringify(db[clientId] ? db[clientId] : [])); return;
    res.end();
})
app.put('/fav', (req, res) => {
    if (req.session.clientId){
        const film = req.body.film;
        db.push(film);
    }   
    res.end();
})
app.delete('/fav', (req, res) => {
    if (req.session.clientId){
        const filmId = req.body.filmId;
        for (let i = 0; i < db[id].length; i++)
            if (db[id].id === filmId)
                db.splice(i, 1);
    }    
    res.end();
})

app.listen(port, () => {
    console.log('server run on port ' + port);
});