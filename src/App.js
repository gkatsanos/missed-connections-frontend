import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MessageListContainer from "./containers/MessageListContainer/MessageListContainer";
import "./App.css";
import MessageContainer from "./containers/MessageContainer/MessageContainer";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="xl">
          <Route exact path="/" component={MessageListContainer} />
          <Route path="/movie/:id" component={MessageContainer} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
