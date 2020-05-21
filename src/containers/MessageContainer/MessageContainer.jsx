import React from "react";
import { connect } from "react-redux";
import Movie from "../../components/Movie/Movie";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import { selectMovieById } from "../MessageListContainer/selectors";

const mapStateToProps = (state, props) => {
  return {
    movie: selectMovieById(state, props),
  };
};

class MessageContainer extends React.Component {
  render() {
    if (this.props.movie) {
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{this.props.movie.title}</title>
          </Helmet>
          <Movie movie={this.props.movie} withReadMoreButton={false} />
        </div>
      );
    } else {
      //@TODO implement a 404 not found page
      return (
        <Typography color="secondary" variant="h3">
          Nothing here
        </Typography>
      );
    }
  }
}

export default connect(mapStateToProps)(MessageContainer);
