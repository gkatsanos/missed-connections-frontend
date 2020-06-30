import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import Message from "./Message";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import { selectMessageById } from "./messageSelectors";

// const mapStateToProps = (state, props) => {
//   return {
//     message: selectMessageById(state, props),
//   };
// };

const MessageDetail = (props) => {
  // const message = useSelector((state) =>
  //   state.message.all.find((message) => message._id === props.match.params.id)
  // );
  const message = useSelector((state) => selectMessageById(state, props));
  if (message) {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{message.title}</title>
        </Helmet>
        <Message message={message} withReadMoreButton={false} />
      </div>
    );
  } else {
    //@TODO fetch message item from API or redirect to 404
    return (
      <Typography color="secondary" variant="h3">
        Nothing here
      </Typography>
    );
  }
};

export default MessageDetail;
