import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../reduxHooks';
import { useMutation, useQuery } from 'react-query';
import Workouts from '../../../api/requests/workouts';
import { Workout as WorkoutType } from '../../../api/models';
import {
  loadUserWorkouts,
  loadWorkouts,
} from '../../../reducers/workoutsReducer';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

export default function Workout() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user)!;
  const { workouts, userWorkoutIds } = useAppSelector(state => state.workouts);

  const workoutsQuery = useQuery('workouts', () => Workouts.getWorkouts(), {
    onSuccess: data => dispatch(loadWorkouts(data)),
  });

  const userWorkoutIdsQuery = useQuery(
    'userWorkoutIds',
    () => Workouts.getWorkoutsForUser(user.username),
    {
      onSuccess: data => {
        dispatch(loadUserWorkouts(data.map(workout => workout.id)));
      },
    },
  );

  const joinWorkoutMutation = useMutation(
    ({ username, workoutId }: { username: string; workoutId: string }) => {
      return Workouts.joinWorkout(username, workoutId);
    },
    {
      onError: (error: Error) => {
        console.log('Error when joining workout:', error);
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("You've joined workout");
        workoutsQuery.refetch();
        userWorkoutIdsQuery.refetch();
      },
    },
  );

  const leaveWorkoutMutation = useMutation(
    ({ workoutId }: { workoutId: string }) => {
      return Workouts.leaveWorkout(workoutId);
    },
    {
      onError: (error: Error) => {
        console.log('Error when leaving workout:', error);
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("You've left workout");
        workoutsQuery.refetch();
        userWorkoutIdsQuery.refetch();
      },
    },
  );

  const renderWorkoutsTableRows = (
    workoutsArr: WorkoutType[],
    actionButtonOnClick: (workoutId: string) => void,
  ) => {
    return workoutsArr.map(workout => (
      <TableRow
        key={workout.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {workout.workoutName}
        </TableCell>
        <TableCell align="right">{workout.roomNumber}</TableCell>
        <TableCell align="right">
          {workout.workoutStartDate.toLocaleTimeString()}
        </TableCell>
        <TableCell align="right">
          {workout.workoutEndDate.toLocaleDateString()}
        </TableCell>
        <TableCell align="right">{workout.participantsNumber}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            onClick={() => actionButtonOnClick(workout.id)}
          >
            Join
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const renderWorkoutsTable = (
    workoutsArr: WorkoutType[],
    actionButtonOnClick: (workoutId: string) => void,
  ) => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Workout name</TableCell>
            <TableCell align="right">Room number</TableCell>
            <TableCell align="right">Start date</TableCell>
            <TableCell align="right">End date</TableCell>
            <TableCell align="right">Participants number</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {renderWorkoutsTableRows(workoutsArr, actionButtonOnClick)}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderAllWorkouts = (workoutsArr: WorkoutType[]) => {
    if (workoutsQuery.isLoading && !workoutsQuery.isRefetching) {
      return <div>Loading workouts...</div>;
    }

    if (workoutsQuery.isError) {
      return <div>Error when loading workouts.</div>;
    }

    if (workouts.length === 0) {
      return <div>There is no workouts.</div>;
    }

    return renderWorkoutsTable(workoutsArr, workoutId => {
      joinWorkoutMutation.mutate({
        username: user.username,
        workoutId,
      });
    });
  };

  const renderUserWorkouts = (workoutsArr: WorkoutType[]) => {
    if (userWorkoutIdsQuery.isLoading && !userWorkoutIdsQuery.isRefetching) {
      return <div>Loading workouts...</div>;
    }

    if (userWorkoutIdsQuery.isError) {
      return <div>Error when loading workouts.</div>;
    }

    if (userWorkoutIds.length === 0) {
      return <div>You don't have any workouts.</div>;
    }

    return renderWorkoutsTable(workoutsArr, workoutId => {
      leaveWorkoutMutation.mutate({ workoutId });
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {renderAllWorkouts(workouts)}
      {renderUserWorkouts(
        workouts.filter(({ id }) => userWorkoutIds.includes(id)),
      )}
    </div>
  );
}
