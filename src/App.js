import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MessageListContainer from "./message/MessageListContainer";
import LoginForm from "./user/Login/Form";
import "./App.css";
import MessageContainer from "./message/MessageContainer";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container>
            <Route exact path="/" component={MessageListContainer} />
            <Route exact path="/login" component={LoginForm} />
            <Route path="/movie/:id" component={MessageContainer} />
          </Container>
        </div>
      </ThemeProvider>
    </Router>
  );
}
const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiFormControl: {
      // The default props to change
      margin: "dense",
    },
  },
});
export default App;
