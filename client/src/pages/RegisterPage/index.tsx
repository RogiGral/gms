import * as React from 'react';
import { Formik, Form } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useMutation } from 'react-query';
import Api from '../../api/Api';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export default function SignUp() {
  const history = useHistory();

  const registerMutation = useMutation(
    ({ firstName, lastName, username, email }: RegisterCredentials) => {
      return Api.Auth.register(firstName, lastName, username, email);
    },
    {
      onError: (error: Error) => {
        console.log('Error when registering:', error);
        toast.error(error.message);
      },
      onSuccess: data => {
        console.log('Registered', data);
        history.push('/login');
        toast.success('Account created successfully! You can now log in.');
      },
    },
  );

  const handleSubmit = ({
    firstName,
    lastName,
    username,
    email,
  }: RegisterCredentials) => {
    console.log('submitting:', firstName, lastName, username, email);
    registerMutation.mutate({ firstName, lastName, username, email });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, touched, errors }) => (
            <Box sx={{ mt: 3 }} component={Form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="last-name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Formik>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" component={ReactRouterLink} to="/login">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
