const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const {Movies} = require('./models/moviedex-model');
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const cors = require( './middleware/cors' );
const uuid = require( 'uuid' );
//const validateToken = require('./middleware/token-validation')

const app = express();

app.use( cors );
//app.use(validateToken);

app.post('/api/add-movie/', jsonParser, (req,res) => {
    let {movie_title, movie_year, movie_rating} = req.body;

    if(!movie_title || !movie_year || !movie_rating){
        res.statusMessage = "You need to send all movie fields to add the movie to the movie list";
        //return res.(403).end()
    }
    let movie_id = uuid.v4();
    let movie = {
        movie_title, movie_year, movie_rating, movie_id
    }
    Movies
        .addNewMovie(movie)
        .then((result) => {
            return res.status(201).json(result);
        })
        .catch((err) => {

        })
})

app.get('/api/movies', (req, res) => {
    console.log("getting movies");
    Movies
        .getAllMovies()
        .then((result) => {
            console.log(result);
            if (!result){
                res.statusMessage = "No movies found in the moviedex"
                return res.status(400).end()
            }
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(400).end()
        })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});