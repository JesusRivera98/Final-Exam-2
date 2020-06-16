const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

const movidexSchema = mongoose.Schema({
    movie_title : {
        type: String,
        required: true,        
    },
    movie_year : {
        type: Number,
        required: true,        
    },
    movie_rating : {
        type: Number,
        required: true,        
    },
    movie_id : {
        type: String,
        required: true,
        unique: true,       
    },
})

const movidexCollection = mongoose.model('movidex', movidexSchema);

const Movies = {
    addNewMovie : function (newMovie){
        return movidexCollection
            .create(newMovie)
            .then(result => {
                return result;
            })
            .catch(err => {
                throw new Error(err);
            })
    },
    getAllMovies: function () {
        return movidexCollection
            .find()
            .then(result => {
                return result;
            })
            .catch(err => {
                throw new Error(err);
            })
    }
}

module.exports = {Movies};