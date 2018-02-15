const {conStr} = require('../config');
const mongoose = require('mongoose');
mongoose.connect(conStr);

const idNameSchema = new mongoose.Schema({
    id: Number,
    name: String
})
const filmSchema = new mongoose.Schema({
    title: String,
    overview: String,
    vote_average: Number,
    release_date: String,
    budget: Number,
    production_companies: [idNameSchema],
    runtime: Number,
    genres: [idNameSchema],
    id: Number,  
    video: Boolean,
    poster_path: String
});
exports.userSchema = new mongoose.Schema({
    id: String,
    favorites: {type: [filmSchema], default: []}
})
