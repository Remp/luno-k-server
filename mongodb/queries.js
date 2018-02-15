const {UserModel} = require('./models');

exports.addFavorite = function(req, res){
    UserModel.findOne({
        id: req.session.clientId
    }, (err, doc) => {
        if (err){
            res.send(err); 
            return;
        }
        const film = req.body.film;
        if (doc){           
            doc.favorites.push({
                title: film.title,
                overview: film.overview,
                vote_average: film.vote_average,
                release_date: film.release_date,
                budget: film.budget,
                production_companies: film.production_companies,
                runtime: film.runtime,
                genres: film.genres,
                video: film.video,
                id: film.id,  
                poster_path: film.poster_path
            });
            doc.save();
        }
        else{
            const newUser = new UserModel({
                id: req.session.clientId,
                favorites: [
                    {
                        title: film.title,
                        overview: film.overview,
                        vote_average: film.vote_average,
                        release_date: film.release_date,
                        budget: film.budget,
                        production_companies: film.production_companies,
                        runtime: film.runtime,
                        genres: film.genres,
                        video: film.video,
                        id: film.id, 
                        poster_path: film.poster_path 
                    }
                ]
            });
            newUser.save();
        } 
    })
}
exports.removeFavorite = function(req, res){
    UserModel.findOne({
        id: req.session.clientId
    }, (err, doc) => {
        if (err){
            res.send(err); 
            return;
        }
        if (doc){
            const filmId = req.body.filmId;
            for (let i = 0; i < doc.favorites.length; i++)
                if (doc.favorites[i].id == filmId){
                    doc.favorites.splice(i, 1); 
                    doc.save();
                    break;          
                }
        }
        res.end();  
    })
}
exports.getFavorites = function(req, res){
    UserModel.findOne({
        id: req.session.clientId
    }).lean().exec((err, doc) => {
        if (err){
            req.send(err);
            return;
        } 
        res.send(JSON.stringify(doc.favorites));           
    })
}
exports.checkFavorite = function(req, res){
    UserModel.findOne({
        id: req.session.clientId
    }, (err, doc) => {
        if (err){
            req.send(err);
            return;
        }
        if (doc)
            for (let i = 0; i < doc.favorites.length; i++)
                if (doc.favorites[i].id == req.body.filmId){
                    res.send('1'); 
                    return;
            }
        res.send('0');       
    })
}