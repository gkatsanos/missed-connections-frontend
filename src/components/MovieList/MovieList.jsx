import React from "react";
import Movie from "../Movie/Movie";
import Grid from "@material-ui/core/Grid";

const MovieList = (props) => {
  return (
    <Grid container spacing={3}>
      {props.messages.map((message) => (
        <Grid key={"grid_" + message.id} item xs={3}>
          <Movie message={message} withReadMoreButton={true} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
