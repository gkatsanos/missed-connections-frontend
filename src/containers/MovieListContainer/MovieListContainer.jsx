import React from 'react';
import { connect } from 'react-redux';
import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "./actions/movie";
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  getMovies
};

class MovieListContainer extends React.Component {

  handleClick = () => {
    debugger;
    this.props.getMovies(this.props.movie.page);
  };

  componentDidMount() {
    this.handleClick();
  }

  render() {
    return (
      <Container maxWidth="xl">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie List</title>
        </Helmet>
        <Button onClick={this.handleClick}> Fetch more </Button>
        <Paper>total movies: {this.props.movie.total}</Paper>
        <MovieList movies={this.props.movie.movies}/>

      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
