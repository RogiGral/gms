import React from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { Form, Formik } from 'formik';
import { Workout } from '../../../api/models';
import Button from '@mui/material/Button';
import { useMutation } from 'react-query';
import Api from '../../../api/Api';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedWorkout: Workout;
}

interface UpdateWorkoutForm {
  newWorkoutName: string;
  newTrainerUsername: string;
  newRoomNumber: string;
  capacity: number;
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

export default function EditWorkoutModal({
  open,
  handleClose,
  selectedWorkout,
}: Props) {
  const updateWorkoutMutation = useMutation(
    ({
      newWorkoutName,
      newTrainerUsername,
      newRoomNumber,
      capacity,
    }: UpdateWorkoutForm) => {
      return Api.Workouts.updateWorkout(
        selectedWorkout.workoutName,
        newWorkoutName,
        newTrainerUsername,
        newRoomNumber,
        capacity,
        selectedWorkout.participantsNumber,
        selectedWorkout.workoutStartDate.toISOString(),
        selectedWorkout.workoutEndDate.toISOString(),
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

  const handleSubmit = ({
    newWorkoutName,
    newTrainerUsername,
    newRoomNumber,
    capacity,
  }: UpdateWorkoutForm) => {
    updateWorkoutMutation.mutate({
      newWorkoutName,
      newTrainerUsername,
      newRoomNumber,
      capacity,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 style={{ marginTop: 0 }}>Edit workout</h2>
        <Formik
          initialValues={{
            newWorkoutName: selectedWorkout.workoutName,
            newTrainerUsername: selectedWorkout.trainerUsername,
            newRoomNumber: selectedWorkout.roomNumber,
            capacity: selectedWorkout.capacity,
          }}
          onSubmit={handleSubmit}
          // validationSchema={isAdmin ? UserAdminSchema : UserSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <TextField
                margin="normal"
                fullWidth
                id="newWorkoutName"
                label="Workout name"
                name="newWorkoutName"
                autoFocus
                value={values.newWorkoutName}
                onChange={handleChange}
                error={touched.newWorkoutName && Boolean(errors.newWorkoutName)}
                helperText={touched.newWorkoutName && errors.newWorkoutName}
              />
              <TextField
                margin="normal"
                fullWidth
                id="newTrainerUsername"
                label="Trainer username"
                name="newTrainerUsername"
                autoFocus
                value={values.newTrainerUsername}
                onChange={handleChange}
                error={
                  touched.newTrainerUsername &&
                  Boolean(errors.newTrainerUsername)
                }
                helperText={
                  touched.newTrainerUsername && errors.newTrainerUsername
                }
              />
              <TextField
                margin="normal"
                fullWidth
                id="newRoomNumber"
                label="Room number"
                name="newRoomNumber"
                autoFocus
                value={values.newRoomNumber}
                onChange={handleChange}
                error={touched.newRoomNumber && Boolean(errors.newRoomNumber)}
                helperText={touched.newRoomNumber && errors.newRoomNumber}
              />
              <TextField
                margin="normal"
                fullWidth
                id="capacity"
                label="Capacity"
                name="capacity"
                autoFocus
                value={values.capacity}
                onChange={handleChange}
                error={touched.capacity && Boolean(errors.capacity)}
                helperText={touched.capacity && errors.capacity}
              />
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
