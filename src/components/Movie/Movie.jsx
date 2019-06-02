import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import CardActions from '@material-ui/core/CardActions';

const Movie = (props) => {
  return (
    <Card raised={true}>
      <CardContent>
        <img alt={props.movie.title} src={`https://image.tmdb.org/t/p/w185${props.movie.poster_path}`}/>
        <Typography variant="h5">
          {props.movie.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/movie/${props.movie.id}`}>routelink</Link>
      </CardActions>
    </Card>
  );
};

export default Movie;
