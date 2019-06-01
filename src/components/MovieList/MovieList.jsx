import React from 'react';
import Movie from '../Movie/Movie';

class MovieList extends React.Component {
  render() {
    return (
      this.props.movies.map(item => (
        <Movie movie={item} key={item.id}></Movie>
      ))
    )
  }
}

export default MovieList;
