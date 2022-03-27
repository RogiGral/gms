import * as React from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Api from '../../api/Api';
import { useAppDispatch } from '../../reduxHooks';
import { loadUser } from '../../reducers/authReducer';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface Credentials {
  username: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const loginMutation = useMutation(
    ({ username, password }: Credentials) => {
      return Api.Auth.login(username, password);
    },
    {
      onError: (error: Error) => {
        console.log('Error when logging:', error);
        toast.error(error.message);
      },
      onSuccess: data => {
        console.log('Logged in! data:', data);
        dispatch(loadUser(data));
        toast.success('Logged in!');
      },
    },
  );

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    console.log('submitting:', username, password);
    loginMutation.mutate({ username, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
