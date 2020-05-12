import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle'
import MovieList from "../../components/MovieList/MovieList";
import { getMoviesIfNeeded, increasePage } from "./actions/movie";
import Container from '@material-ui/core/Container';
import { Helmet } from "react-helmet";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  getMoviesIfNeeded,
  increasePage,
};

class MovieListContainer extends React.Component {

  fetchMovies = () => {
    console.log(this.props.movie.page);
    this.props.getMoviesIfNeeded(this.props.movie.page);
  };

  handleScroll = () => {
    let d = document.body;
    let scrollTop = window.scrollY;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let height = d.offsetHeight - windowHeight;
    let scrollPercentage = (scrollTop / height);
    // if the scroll is more than 90% from the top, load more content.
    if (scrollPercentage > 0.90) {
      // this.fetchMovies();
      this.props.increasePage();
    }
  };

  componentDidMount() {
    this.fetchMovies();
    window.addEventListener('scroll', throttle(this.handleScroll, 1000));
  }

  componentDidUpdate(prevProps) {
    if (this.props.movie.page !== prevProps.movie.page) {
      this.fetchMovies();
    }
  }

  render() {
    return (
      <Container maxWidth="xl">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie List</title>
        </Helmet>
        <MovieList movies={this.props.movie.movies}/>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
