import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";

const Movie = (props) => {
  const card = <Card raised={true}>
    <CardHeader
      title={props.movie.title}
    />
    <CardMedia
      src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
      title={props.movie.title}
     component='img'/>
    <CardContent>
      <Typography variant="body2" component="p">
        {props.movie.overview}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton aria-label="Add to favorites">
        <FavoriteIcon />
      </IconButton>
    </CardActions>
  </Card>;
  return (
      props.withReadMoreButton ? (
        <Link underline="none" component={RouterLink} to={`/movie/${props.movie.id}`}>{card}</Link>
      ) : ( card )
  );
};

export default Movie;
