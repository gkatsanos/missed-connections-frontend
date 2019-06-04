import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import MovieListContainer from './containers/MovieListContainer/MovieListContainer';
import './App.css';
import MovieScreen from "./containers/MovieScreen/MovieScreen";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="xl">
          <Route exact path="/" component={MovieListContainer} />
          <Route path="/movie/:id" component={MovieScreen} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
