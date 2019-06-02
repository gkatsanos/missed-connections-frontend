import React from 'react';
import Movie from '../Movie/Movie';
import Grid from '@material-ui/core/Grid';

const MovieList = (props) => {
  return (
    <Grid container spacing={3}>
        {
          props.movies.map(item => (
            <Grid item xs={3}>
              <Movie movie={item} key={item.id}></Movie>
            </Grid>
          ))
        }
    </Grid>
  )
};

export default MovieList;
