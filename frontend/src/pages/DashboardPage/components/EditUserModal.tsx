import { useAppDispatch, useAppSelector } from '../../../reduxHooks';
import { useMutation, useQuery } from 'react-query';
import Api from '../../../api/Api';
import { loadUsers } from '../../../reducers/usersReducer';
import { toast } from 'react-toastify';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
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
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import React from 'react';
import { User, UserRole } from '../../../api/models';
import { Form, Formik } from 'formik';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedUser: User;
}

interface UpdateUserForm {
  newUsername: string;
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
  firstName: Yup.string().required("Please enter user's first name"),
  lastName: Yup.string().required("Please enter user's last name"),
});

const UserAdminSchema = Yup.object().shape({
  newUsername: Yup.string().required("Please enter user's username"),
  firstName: Yup.string().required("Please enter user's first name"),
  lastName: Yup.string().required("Please enter user's last name"),
  email: Yup.string()
    .email('Invalid email')
    .required("Please enter user's email"),
});

export default function EditUserModal({
  open,
  handleClose,
  selectedUser,
}: Props) {
  const auth = useAppSelector(state => state.auth.user);
  const isAdmin = auth!.role === UserRole.ROLE_ADMIN;

  const updateUserMutation = useMutation(
    ({
      username,
      firstName,
      lastName,
      newUsername,
      email,
      role,
      isActive,
      isNonLocked,
    }: UpdateUserForm) => {
      return Api.Users.updateUser(
        username,
        firstName,
        lastName,
        newUsername,
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
        toast.success('User has been updated');
      },
    },
  );

  // @ts-ignore
  const handleSubmit = ({
    firstName,
    lastName,
    isActive,
    isNonLocked,
    newUsername,
    role,
    email,
  }: UpdateUserForm) => {
    updateUserMutation.mutate({
      username: selectedUser.username,
      firstName,
      lastName,
      newUsername,
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
        <h2 style={{ marginTop: 0 }}>Edit user</h2>
        <Formik
          initialValues={{
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            isActive: selectedUser.active,
            isNonLocked: selectedUser.notLocked,
            // admin only
            username: selectedUser.username,
            newUsername: selectedUser.username,
            role: selectedUser.role,
            email: selectedUser.email,
          }}
          onSubmit={handleSubmit}
          validationSchema={isAdmin ? UserAdminSchema : UserSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
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
              {isAdmin && (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="newUsername"
                    label="Username"
                    name="newUsername"
                    autoFocus
                    value={values.newUsername}
                    onChange={handleChange}
                    error={touched.newUsername && Boolean(errors.newUsername)}
                    helperText={touched.newUsername && errors.newUsername}
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
                </>
              )}
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
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
