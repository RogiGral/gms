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
import WorkoutsTable from './WorkoutsTable';

export default function Workout() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user)!;
  const { workouts, userWorkoutIds } = useAppSelector(state => state.workouts);

  const workoutsQuery = useQuery('workouts', () => Workouts.getWorkouts(), {
    onSuccess: data => dispatch(loadWorkouts(data)),
  });

  const userWorkoutIdsQuery = useQuery(
    'userWorkoutIds',
    () => Workouts.getWorkoutsForUser(user.id),
    {
      onSuccess: data => {
        dispatch(loadUserWorkouts(data.map(resp => resp.workoutId.id)));
      },
    },
  );

  const joinWorkoutMutation = useMutation(
    ({ userId, workoutId }: { userId: number; workoutId: number }) => {
      return Workouts.joinWorkout(userId, workoutId);
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
    ({ userId, workoutId }: { userId: number; workoutId: number }) => {
      return Workouts.leaveWorkout(userId, workoutId);
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

  const renderAllWorkouts = () => {
    if (workoutsQuery.isLoading && !workoutsQuery.isRefetching) {
      return <div>Loading workouts...</div>;
    }

    if (workoutsQuery.isError) {
      return <div>Error when loading workouts.</div>;
    }

    if (workouts.length === 0) {
      return <div>There is no workouts you can join.</div>;
    }

    return (
      <WorkoutsTable
        workouts={workouts}
        tableName="Available workouts"
        renderActionButton={workoutId => (
          <Button
            variant="contained"
            disabled={userWorkoutIds.includes(workoutId)}
            onClick={() =>
              joinWorkoutMutation.mutate({ workoutId, userId: user.id })
            }
          >
            {userWorkoutIds.includes(workoutId) ? 'Joined' : 'Join'}
          </Button>
        )}
      />
    );
  };

  const renderUserWorkouts = () => {
    if (userWorkoutIdsQuery.isLoading && !userWorkoutIdsQuery.isRefetching) {
      return <div>Loading workouts...</div>;
    }

    if (userWorkoutIdsQuery.isError) {
      return <div>Error when loading workouts.</div>;
    }

    if (userWorkoutIds.length === 0) {
      return <div>You don't have any workouts joined.</div>;
    }

    return (
      <WorkoutsTable
        workouts={workouts.filter(({ id }) => userWorkoutIds.includes(id))}
        tableName="Your workouts"
        renderActionButton={workoutId => (
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              leaveWorkoutMutation.mutate({ workoutId, userId: user.id })
            }
          >
            Leave
          </Button>
        )}
      />
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <h2>Workouts</h2>
      {renderAllWorkouts()}
      {renderUserWorkouts()}
    </div>
  );
}
