import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDispatch } from "react-redux";
import { loginRequest } from "../userActions";

const LoginForm = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(state));
  };

  const handleClickShowPassword = () => {
    setState((prevState) => ({ ...state, showPassword: !state.showPassword }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState((prevState) => ({ ...state, [name]: value }));
  };

  return (
    <Container fixed>
      <Box
        color="text.primary"
        display="flex"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            autoComplete="email"
            name="email"
            label="email"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={state.showPassword ? "text" : "password"}
            name="password"
            label="password"
            variant="outlined"
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
