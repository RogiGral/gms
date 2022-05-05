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
import EditWorkoutModal from './EditWorkoutModal';
import CreateWorkoutModal from './CreateWorkoutModal';
import AssignUserToWorkoutModal from './AssignUserToWorkoutModal';

export default function Workout() {
  const [showAssignUserModal, setShowAssignUserModal] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(
    null,
  );
  const [showEditWorkoutModal, setShowEditWorkoutModal] = useState(false);
  const [showCreateWorkoutModal, setShowCreateWorkoutModal] = useState(false);
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
        dispatch(
          loadUserWorkouts(
            data.map(resp => {
              return {
                id: resp.id,
                workoutId: resp.workoutId.id,
                userId: resp.userId.id,
              };
            }),
          ),
        );
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
    ({ userWorkoutId }: { userWorkoutId: number }) => {
      return Workouts.leaveWorkout(userWorkoutId);
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
        isCoach={user.role === UserRole.ROLE_COACH}
        renderActionButton={workoutId => (
          <Button
            variant="contained"
            disabled={userWorkoutIds
              .map(userWorkout => userWorkout.workoutId)
              .includes(workoutId)}
            onClick={() =>
              joinWorkoutMutation.mutate({ workoutId, userId: user.id })
            }
          >
            {userWorkoutIds
              .map(userWorkout => userWorkout.workoutId)
              .includes(workoutId)
              ? 'Joined'
              : 'Join'}
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
        renderAssignButton={workoutId => (
          <Button
            variant="contained"
            onClick={() => {
              setSelectedWorkoutId(workoutId);
              setShowAssignUserModal(true);
            }}
          >
            Assign user
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
        workouts={workouts.filter(({ id }) =>
          userWorkoutIds.map(userWorkout => userWorkout.workoutId).includes(id),
        )}
        tableName="Your workouts"
        isAdmin={isAdmin}
        isCoach={user.role === UserRole.ROLE_COACH}
        renderActionButton={workoutId => (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              const userWorkoutId = userWorkoutIds.find(
                userWorkout =>
                  userWorkout.userId === user.id &&
                  userWorkout.workoutId === workoutId,
              )!.id;
              leaveWorkoutMutation.mutate({ userWorkoutId });
            }}
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
        renderAssignButton={workoutId => <></>}
      />
    );
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
      <h2>Workouts</h2>
      {renderAllWorkouts()}
      {!isAdmin && renderUserWorkouts()}
      {isAdmin && (
        <Button
          variant="contained"
          onClick={() => setShowCreateWorkoutModal(true)}
        >
          Create new workout
        </Button>
      )}
      {isAdmin && selectedWorkout && (
        <EditWorkoutModal
          open={showEditWorkoutModal}
          handleClose={() => {
            setShowEditWorkoutModal(false);
            setSelectedWorkout(null);
            workoutsQuery.refetch();
          }}
          selectedWorkout={selectedWorkout as WorkoutType}
        />
      )}
      {isAdmin && (
        <CreateWorkoutModal
          open={showCreateWorkoutModal}
          handleClose={() => {
            setShowCreateWorkoutModal(false);
            workoutsQuery.refetch();
          }}
        />
      )}
      {user.role === UserRole.ROLE_COACH && selectedWorkoutId !== null && (
        <AssignUserToWorkoutModal
          open={showAssignUserModal}
          handleClose={() => {
            setShowAssignUserModal(false);
            setSelectedWorkoutId(null);
          }}
          workoutId={selectedWorkoutId as number}
        />
      )}
    </div>
  );
}
