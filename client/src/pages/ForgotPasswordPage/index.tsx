import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Api from '../../api/Api';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as ReactRouterLink } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Please enter email'),
});

export default function ForgotPasswordPage() {
  const resetPasswordMutation = useMutation(
    ({ email }: { email: string }) => {
      return Api.Auth.resetPassword(email);
    },
    {
      onError: (error: Error) => {
        console.log('Error when resetting password:', error);
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Email sent successfully');
      },
    },
  );

  const handleSubmit = ({ email }: { email: string }) => {
    console.log('submitting:', email);
    resetPasswordMutation.mutate({ email });
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
          Remind your password
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset password
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item>
              <Link variant="body2" component={ReactRouterLink} to="/login">
                Go back to login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
