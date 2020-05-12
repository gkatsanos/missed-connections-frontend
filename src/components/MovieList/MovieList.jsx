import React from 'react';
import Movie from '../Movie/Movie';
import Grid from '@material-ui/core/Grid';

const MovieList = (props) => {
  return (
    <Grid container spacing={3}>
        {
          props.movies.map(movie => (
            <Grid key={'grid_' + movie.id} item xs={3}>
              <Movie movie={movie} withReadMoreButton={true} />
            </Grid>
          ))
        }
    </Grid>
  )
};

export default MovieList;
