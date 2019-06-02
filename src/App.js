import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Wrapper from './containers/MovieListContainer/MovieListContainer';
import './App.css';
import MovieScreen from "./containers/MovieScreen/MovieScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Wrapper} />
        <Route path="/movie/:id" component={MovieScreen} />
      </div>
    </Router>
  );
}

export default App;
