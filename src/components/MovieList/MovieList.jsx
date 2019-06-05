import React from 'react';
import Movie from '../Movie/Movie';
import Grid from '@material-ui/core/Grid';

const MovieList = (props) => {
  return (
    <Grid container spacing={3}>
        {
          props.movies.map(movie => (
            <Grid key={movie.id} item xs={3}>
              <Movie movie={movie} key={movie.id} withReadMoreButton={true} />
            </Grid>
          ))
        }
    </Grid>
  )
};

export default MovieList;
