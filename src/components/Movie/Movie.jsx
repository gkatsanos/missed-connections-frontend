import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

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
        { props.withReadMoreButton ? (
          <Button
            align="right"
            variant="outlined"
            color="primary"
            component={Link}
            to={`/movie/${props.movie.id}`}>
            read more...
          </Button> ) : null
        }
      </CardActions>
    </Card>
  );
};

export default Movie;
