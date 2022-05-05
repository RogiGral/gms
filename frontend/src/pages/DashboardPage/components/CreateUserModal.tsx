import { useMutation } from 'react-query';
import Api from '../../../api/Api';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { UserRole } from '../../../api/models';
import { Form, Formik } from 'formik';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface NewUserForm {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isNonLocked: boolean;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserSchema = Yup.object().shape({
  username: Yup.string().required("Please enter user's username"),
  firstName: Yup.string().required("Please enter user's first name"),
  lastName: Yup.string().required("Please enter user's last name"),
  email: Yup.string()
    .email('Invalid email')
    .required("Please enter user's email"),
});

export default function CreateUserModal({ open, handleClose }: Props) {
  const createUserMutation = useMutation(
    ({
      username,
      firstName,
      lastName,
      email,
      role,
      isActive,
      isNonLocked,
    }: NewUserForm) => {
      return Api.Users.createUser(
        username,
        firstName,
        lastName,
        email,
        role,
        isActive,
        isNonLocked,
      );
    },
    {
      onError: (error: Error) => {
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success('User has been created');
      },
    },
  );

  const handleSubmit = ({
    username,
    firstName,
    lastName,
    email,
    role,
    isActive,
    isNonLocked,
  }: NewUserForm) => {
    createUserMutation.mutate({
      username,
      firstName,
      lastName,
      email,
      role,
      isActive,
      isNonLocked,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 style={{ marginTop: 0 }}>Add new user</h2>
        <Formik
          initialValues={{
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            role: UserRole.ROLE_USER,
            isActive: true,
            isNonLocked: true,
          }}
          onSubmit={handleSubmit}
          validationSchema={UserSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                autoFocus
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                autoFocus
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={values.role}
                  label="Role"
                  onChange={handleChange}
                  id="role"
                  name="role"
                >
                  <MenuItem value={UserRole.ROLE_USER}>User</MenuItem>
                  <MenuItem value={UserRole.ROLE_COACH}>Coach</MenuItem>
                  <MenuItem value={UserRole.ROLE_ADMIN}>Admin</MenuItem>
                </Select>
              </FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.isActive}
                      onChange={handleChange}
                      name="isActive"
                    />
                  }
                  label="Is active"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.isNonLocked}
                      name="isNonLocked"
                      onChange={handleChange}
                    />
                  }
                  label="Is non locked"
                />
              </FormGroup>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
