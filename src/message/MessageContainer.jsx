import React from "react";
import { connect } from "react-redux";
import Message from "./Message";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import { selectMessageById } from "./messageSelectors";

const mapStateToProps = (state, props) => {
  return {
    message: selectMessageById(state, props),
  };
};

class MessageContainer extends React.Component {
  render() {
    if (this.props.message) {
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{this.props.message.title}</title>
          </Helmet>
          <Message message={this.props.message} withReadMoreButton={false} />
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
