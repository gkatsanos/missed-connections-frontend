import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle'
import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "./actions/movie";
import Container from '@material-ui/core/Container';
import { Helmet } from "react-helmet";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  getMovies
};

class MovieListContainer extends React.Component {

  fetchMovies = () => {
    this.props.getMovies(this.props.movie.page);
  };

  handleScroll = () => {
    debugger;
    console.log('scrolled');
    let d = document.body;
    let scrollTop = window.scrollY;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let height = d.offsetHeight - windowHeight;
    let scrollPercentage = (scrollTop / height);
    // if the scroll is more than 90% from the top, load more content.
    if (scrollPercentage > 0.90) {
      this.fetchMovies();
    }

  };

  componentDidMount() {
    this.fetchMovies();
    window.addEventListener('scroll', throttle(this.handleScroll, 500));
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
