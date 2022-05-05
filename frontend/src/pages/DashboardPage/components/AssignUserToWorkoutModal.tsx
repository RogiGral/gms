import React from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { useMutation, useQuery } from 'react-query';
import Api from '../../../api/Api';
import { useAppDispatch, useAppSelector } from '../../../reduxHooks';
import { loadUsers } from '../../../reducers/usersReducer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { UserRole } from '../../../api/models';

interface Props {
  open: boolean;
  handleClose: () => void;
  workoutId: number;
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

export default function AssignUserToWorkoutModal({
  open,
  handleClose,
  workoutId,
}: Props) {
  const users = useAppSelector(state => state.users.users);
  const auth = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const usersQuery = useQuery('users', () => Api.Users.getUsers(), {
    onSuccess: data => {
      console.log('data:', data);
      dispatch(loadUsers(data));
    },
  });

  const assignToWorkoutMutation = useMutation(
    ({ userId, workoutId }: { userId: number; workoutId: number }) => {
      return Api.Workouts.joinWorkout(userId, workoutId);
    },
    {
      onError: (error: Error) => {
        console.log('Error when joining workout:', error);
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success('User has been assigned');
      },
    },
  );

  const renderModalContent = () => {
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
      .filter(user => user.id !== auth!.id && user.role !== UserRole.ROLE_ADMIN)
      .map(user => (
        <TableRow key={user.id}>
          <TableCell align="left">{user.firstName}</TableCell>
          <TableCell align="left">{user.lastName}</TableCell>
          <TableCell align="left">{user.username}</TableCell>
          <TableCell align="left">{user.email}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() =>
                assignToWorkoutMutation.mutate({
                  userId: user.id,
                  workoutId,
                })
              }
            >
              Assign
            </Button>
          </TableCell>
        </TableRow>
      ));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 style={{ marginTop: 0 }}>Assign user to membership</h2>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">First name</TableCell>
                <TableCell align="left">Last name</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left" />
              </TableRow>
            </TableHead>
            <TableBody>{renderModalContent()}</TableBody>
          </Table>
        </TableContainer>
        <Button variant="outlined" sx={{ mt: 3 }} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
