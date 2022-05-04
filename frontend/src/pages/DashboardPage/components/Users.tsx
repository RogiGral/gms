import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../reduxHooks';
import { useMutation, useQuery } from 'react-query';
import Api from '../../../api/Api';
import { loadUsers } from '../../../reducers/usersReducer';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import { User, UserRole } from '../../../api/models';
import EditUserModal from './EditUserModal';
import { toast } from 'react-toastify';
import CreateUserModal from './CreateUserModal';

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const users = useAppSelector(state => state.users.users);
  const auth = useAppSelector(state => state.auth.user);
  const isAdmin = auth!.role === UserRole.ROLE_ADMIN;
  const dispatch = useAppDispatch();

  const usersQuery = useQuery('users', () => Api.Users.getUsers(), {
    onSuccess: data => {
      console.log('data:', data);
      dispatch(loadUsers(data));
    },
  });

  const deleteUserMutation = useMutation(
    ({ id }: { id: number }) => {
      return Api.Users.deleteUser(id);
    },
    {
      onError: (error: Error) => {
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success('User deleted');
        usersQuery.refetch();
      },
    },
  );

  const getFilterMethod = (user: User) => {
    if (auth!.role === UserRole.ROLE_COACH) {
      return user.id !== auth!.id && user.role === UserRole.ROLE_USER;
    }

    if (auth!.role === UserRole.ROLE_ADMIN) {
    }
    return user.id !== auth!.id;
  };

  const renderUsers = () => {
    if (usersQuery.isLoading && !usersQuery.isRefetching) {
      return <div>Loading users...</div>;
    }

    if (usersQuery.isError) {
      return <div>Error when loading users.</div>;
    }

    if (users.length === 0) {
      return <div>There are no users.</div>;
    }

    return users
      .filter(user => getFilterMethod(user))
      .map(user => (
        <TableRow key={user.id}>
          <TableCell align="left">{user.firstName}</TableCell>
          <TableCell align="left">{user.lastName}</TableCell>
          <TableCell align="left">{user.username}</TableCell>
          <TableCell align="left">{user.email}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => {
                setSelectedUser(user);
                setShowEditUserModal(true);
              }}
            >
              Edit
            </Button>
          </TableCell>
          {isAdmin && (
            <TableCell>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteUserMutation.mutate({ id: user.id })}
              >
                Delete
              </Button>
            </TableCell>
          )}
        </TableRow>
      ));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      <h2>Users</h2>
      <h3>Registered users</h3>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right" />
              {isAdmin && <TableCell align="right" />}
            </TableRow>
          </TableHead>
          <TableBody>{renderUsers()}</TableBody>
        </Table>
      </TableContainer>
      {isAdmin && (
        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          onClick={() => setShowCreateUserModal(true)}
        >
          Create new user
        </Button>
      )}
      {showEditUserModal && (
        <EditUserModal
          open={showEditUserModal}
          handleClose={() => {
            setShowEditUserModal(false);
            setSelectedUser(null);
            usersQuery.refetch();
          }}
          selectedUser={selectedUser as User}
        />
      )}
      {isAdmin && showCreateUserModal && (
        <CreateUserModal
          open={showCreateUserModal}
          handleClose={() => {
            setShowCreateUserModal(false);
            usersQuery.refetch();
          }}
        />
      )}
    </div>
  );
}
