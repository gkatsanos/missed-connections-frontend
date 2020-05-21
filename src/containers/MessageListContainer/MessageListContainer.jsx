import React from "react";
import { connect } from "react-redux";
import throttle from "lodash.throttle";
import MovieList from "../../components/MovieList/MovieList";
import { getMessagesIfNeeded, increasePage } from "./actions/message";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {
  getMessagesIfNeeded,
  increasePage,
};

class MessageListContainer extends React.Component {
  fetchMessage = () => {
    console.log("component page:", this.props.message.page);
    this.props.getMessagesIfNeeded(this.props.message.page);
  };

  handleScroll = throttle(() => {
    let d = document.body;
    let scrollTop = window.scrollY;
    let windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    let height = d.offsetHeight - windowHeight;
    let scrollPercentage = scrollTop / height;
    // if the scroll is more than 90% from the top, load more content.
    if (scrollPercentage > 0.9) {
      if (!this.props.message.isFetching) {
        this.props.increasePage();
      }
    }
  }, 1000);

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.message.page !== prevProps.message.page) {
      this.fetchMessage();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <Container maxWidth="xl">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Movie List</title>
        </Helmet>
        <MovieList messages={this.props.message.all} />
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListContainer);
