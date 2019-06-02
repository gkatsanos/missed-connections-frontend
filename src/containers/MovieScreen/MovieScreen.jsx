import React from 'react';
import { connect } from 'react-redux';
import Movie from "../../components/Movie/Movie";
import Typography from '@material-ui/core/Typography';

const mapStateToProps = (state, props) => {
  debugger;
  const movie = state.movies.find((movie) => movie.id === Number(props.match.params.id));
  console.log(movie);
  return { movie };
};

class MovieScreen extends React.Component {
  render() {
    return (
      this.props.movie ?
        <Movie movie={this.props.movie}></Movie> :
        <Typography variant="h3">Nothing here</Typography>
    )
  }
}

export default connect(mapStateToProps)(MovieScreen);
