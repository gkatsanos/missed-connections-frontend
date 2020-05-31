import React from "react";
import { connect } from "react-redux";
import throttle from "lodash.throttle";
import { getMessagesIfNeeded } from "./messageActions";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import Message from "./Message";
import Grid from "@material-ui/core/Grid";

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {
  getMessagesIfNeeded,
};

class MessageList extends React.Component {
  fetchMessage = async () => {
    console.log("component page:", this.props.message.page);
    await this.props.getMessagesIfNeeded(this.props.message.page);
  };

  handleScroll = throttle(() => {
    console.log("scrolled");
    let d = document.body;
    let scrollTop = window.scrollY;
    let windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    let height = d.offsetHeight - windowHeight;
    let scrollPercentage = scrollTop / height;
    // if the scroll is more than 90% from the top, load more content.
    if (scrollPercentage > 0.9) {
      if (
        !this.props.message.isFetching &&
        this.props.message.page <= this.props.message.totalPages
      ) {
        this.props.fetchMessage();
      }
    }
  }, 1000);

  // @TODO this function content could potentially be abstracted with parts of
  // handleScroll
  calculateInitialheight() {
    // get height of content
    const d = document.body;
    const bodyHeight = d.offsetHeight;
    let windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    if (
      windowHeight - bodyHeight > 200 &&
      !this.props.message.isFetching &&
      this.props.message.page <= this.props.message.totalPages
    ) {
      this.fetchMessage();
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.fetchMessage().then(() => this.calculateInitialheight());
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <Container maxWidth="xl">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Message List</title>
        </Helmet>
        <Grid container spacing={3}>
          {this.props.message.all.map((message) => (
            <Grid key={"grid_" + message._id} item xs={3}>
              <Message message={message} withReadMoreButton={true} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
