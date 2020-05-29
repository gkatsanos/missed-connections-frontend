import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MessageList from "./message/MessageList";
import LoginForm from "./user/Login/Form";
import "./App.css";
import MessageContainer from "./message/MessageContainer";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={isAuthenticated ? "authorized" : "non-authorized"}>
          <Container>
            {!isAuthenticated ? (
              <LoginForm />
            ) : (
              <Switch>
                <Route exact path="/" component={MessageList} />
                <Route path="/messages" component={MessageList} />
                <Route path="/login" component={LoginForm} />
                <Route path="/message/:id" component={MessageContainer} />
              </Switch>
            )}
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
