import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "./actions/movies";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getMovies: () => dispatch(getMovies())
});

class Wrapper extends React.Component {

  getMovies = (event) => {
    this.props.getMovies();
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Wrapper component.
        </p>
        <a
          onClick={this.getMovies}
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        total movies: {this.props.movies.total_results}
        <MovieList movies={this.props.movies}/>

      </header>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
