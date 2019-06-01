import React from 'react';

class Movie extends React.Component {
  render() {
    return (
      <div>{this.props.movie.title}</div>
    )
  }
}

export default Movie;
