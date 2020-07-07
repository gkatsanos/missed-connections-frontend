import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { Helmet } from "react-helmet";
import { selectMessageById } from "./messageSelectors";
import { getMessage } from "./messageActions";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const MessageDetail = (props) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  const dispatch = useDispatch();
  const message = useSelector((state) => selectMessageById(state, props));
  useEffect(() => {
    if (!message) {
      dispatch(getMessage(props.match.params.id));
    }
  }, [message, props.match.params.id, dispatch]);

  if (message) {
    return (
      <Container maxWidth="sm" className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{message.title}</title>
        </Helmet>
        <Message message={message} withReadMoreButton={false} />
      </Container>
    );
  } else {
    return <div>no message</div>;
  }
};

export default MessageDetail;
