import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import classes from './styles';
import Input from './Input';
import Icon from './Icon';
import { AUTH } from '../../redux/actionTypes';

const clientId =
  '737626982500-8nnk992aku81j5vmama0aprad90ss2os.apps.googleusercontent.com';

const Auth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clinetId: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {};
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In is unsuccessful. Try again later');
  };

  return (
    <Container coponents="main" maxWidth="xs">
      <Paper sx={classes.paper} elevation={3}>
        <Avatar sx={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" mb={2}>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form sx={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleShowPassword={handleShowPassword}
              type={showPassword ? 'text' : 'password'}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />
            )}
          </Grid>
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <Button
                sx={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account ? Sign in'
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
