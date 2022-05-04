import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../reduxHooks';
import { useMutation, useQuery } from 'react-query';
import Workouts from '../../../api/requests/workouts';
import { UserRole, Workout as WorkoutType } from '../../../api/models';
import {
  loadUserWorkouts,
  loadWorkouts,
} from '../../../reducers/workoutsReducer';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import WorkoutsTable from './WorkoutsTable';
import AssignUserToMembershipModal from './AssignUserToMembershipModal';
import EditWorkoutModal from './EditWorkoutModal';

export default function Workout() {
  const [showEditWorkoutModal, setShowEditWorkoutModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user)!;
  const isAdmin = user.role === UserRole.ROLE_ADMIN;
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
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success("You've left workout");
        workoutsQuery.refetch();
        userWorkoutIdsQuery.refetch();
      },
    },
  );

  const deleteWorkoutMutation = useMutation(
    ({ workoutId }: { workoutId: number }) => {
      return Workouts.deleteWorkout(workoutId);
    },
    {
      onError: (error: Error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Workout deleted');
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
        isAdmin={isAdmin}
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
        renderEditButton={workout => (
          <Button
            variant="contained"
            onClick={() => {
              setSelectedWorkout(workout);
              setShowEditWorkoutModal(true);
            }}
          >
            Edit
          </Button>
        )}
        renderDeleteButton={workoutId => (
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteWorkoutMutation.mutate({ workoutId })}
          >
            Delete
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
        isAdmin={isAdmin}
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
        renderEditButton={workout => (
          <Button
            variant="contained"
            onClick={() => {
              setSelectedWorkout(workout);
              setShowEditWorkoutModal(true);
            }}
          >
            Edit
          </Button>
        )}
        renderDeleteButton={workoutId => (
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteWorkoutMutation.mutate({ workoutId })}
          >
            Delete
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
      {!isAdmin && renderUserWorkouts()}
      {isAdmin && selectedWorkout && (
        <EditWorkoutModal
          open={showEditWorkoutModal}
          handleClose={() => {
            setShowEditWorkoutModal(false);
            setSelectedWorkout(null);
          }}
          selectedWorkout={selectedWorkout as WorkoutType}
        />
      )}
    </div>
  );
}
