import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import throttle from "lodash.throttle";
import { makeStyles } from "@material-ui/core/styles";
import { getMessagesIfNeeded } from "./messageActions";
import {
  selectMessages,
  selectPage,
  selectTotalNumberPages,
  selectIsFetching,
} from "./messageSelectors";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import Message from "./Message";
import Grid from "@material-ui/core/Grid";

const MessageList = (props) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  const message = useSelector((state) => selectMessages(state));
  const page = useSelector((state) => selectPage(state));
  const totalPages = useSelector((state) => selectTotalNumberPages(state));
  const isFetching = useSelector((state) => selectIsFetching(state));

  const dispatch = useDispatch();
  const fetchMessage = useCallback(() => {
    console.log("component page:", page);
    return dispatch(getMessagesIfNeeded(page));
  }, [dispatch, page]);

  const handleScroll = throttle(() => {
    console.log("scrolled");
    let d = document.body;
    let scrollTop = window.scrollY;
    let windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    let height = d.offsetHeight - windowHeight;
    let scrollPercentage = scrollTop / height;
    if (scrollPercentage > 0.5) {
      if (!isFetching && page <= totalPages) {
        fetchMessage();
      }
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!message.length) {
      fetchMessage();
    }
  }, [fetchMessage, message]);

  if (message.length) {
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Message List</title>
        </Helmet>
        <Grid container spacing={3}>
          {message.map((message) => (
            <Grid key={"grid_" + message._id} item sm={6} md={4}>
              <Message message={message} withReadMoreButton={true} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return <div>no messages found</div>;
  }
};

export default MessageList;
