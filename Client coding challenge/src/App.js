import React from 'react';
import './App.css';
import Movie from './Movie';
import MovieForm from './MovieForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
  }

  /*
    Your code goes here
  */

  componentDidMount() {
    let settings = {
      method: 'GET',
      headers: {
        'session-exam-token': 'success-token',
      }
    }
    let URL = 'http://localhost:8080/api/movies'

    fetch(URL, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
      }
      throw new Error(response.statusText);
        this.setState({errorMessage:""});
      })
      .then(responseJSON => {
        console.log(responseJSON);
        this.setState({movies:responseJSON})
      })
      .catch(err => {
        //throw new Error(err);
        this.setState({errorMessage:err.message});
      })
  }
  createMovie = (event) => {
    event.preventDefault();
    let movie_title = event.target.title.value;
    let movie_year = event.target.year.value;
    let movie_rating = event.target.rating.value;
    console.log(movie_rating);
    let data = { movie_title, movie_year, movie_rating }

    let settings = {
      method : 'POST',

      headers: {
        'session-exam-token': 'success-token',
        "content-Type": "application/JSON"
      },
      body: JSON.stringify(data),
    };
      let URL = 'http://localhost:8080/api/add-movie'
      fetch(URL, settings)
        .then(result => {
          console.log(result);
          this.setState({errorMessage:""});

        })
        .catch(err => {
          console.log(err);
          this.setState({errorMessage:err.message});
        })

  }

  render() {
    return (
      <div>
        {this.state.movies.map(movie => {
          console.log(movie)
          return (<div> title = {movie.movie_title}, year = {movie.movie_year}, rating={movie.movie_rating}</div>)
        })
        }
        {/*<div>
            title = {props.title}, year = {props.year}, rating={props.rating}
        </div>*/}
        <form onSubmit={e => this.createMovie(e)}>
          <label for="title">title</label>
          <input id="title" />
          <label for="year">year</label>
          <input id="year" />
          <label for="rating">rating</label>
          <input id="rating" />
          <button type="submit">
            Create
          </button>
        </form>
        <div>
          error = {this.state.errorMessage}
        </div>

      </div>
    );
  }
}

export default App;
