import React from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import { useMutation } from 'react-query';
import Api from '../../../api/Api';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface CreateWorkoutForm {
  workoutName: string;
  trainerUsername: string;
  roomNumber: string;
  capacity: number;
  workoutStartDate: string;
  workoutEndDate: string;
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

const WorkoutSchema = Yup.object().shape({
  workoutName: Yup.string().required('Please enter workout name'),
  trainerUsername: Yup.string().required('Please enter trainer username'),
  roomNumber: Yup.string().required('Please enter room number'),
  capacity: Yup.string().required('Please enter capacity'),
  workoutStartDate: Yup.string().required('Please enter start date'),
  workoutEndDate: Yup.string().required('Please enter end date'),
});

export default function CreateWorkoutModal({ open, handleClose }: Props) {
  const createWorkoutMutation = useMutation(
    ({
      workoutName,
      trainerUsername,
      roomNumber,
      capacity,
      workoutStartDate,
      workoutEndDate,
    }: CreateWorkoutForm) => {
      return Api.Workouts.createWorkout(
        workoutName,
        trainerUsername,
        roomNumber,
        capacity,
        workoutStartDate,
        workoutEndDate,
      );
    },
    {
      onError: (error: Error) => {
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success('Workout has been created');
      },
    },
  );

  const handleSubmit = ({
    workoutName,
    trainerUsername,
    roomNumber,
    capacity,
    workoutStartDate,
    workoutEndDate,
  }: CreateWorkoutForm) => {
    console.log('submitting');
    createWorkoutMutation.mutate({
      workoutName,
      trainerUsername,
      roomNumber,
      capacity,
      workoutStartDate,
      workoutEndDate,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 style={{ marginTop: 0 }}>Create workout</h2>
        <Formik
          initialValues={{
            workoutName: '',
            trainerUsername: '',
            roomNumber: '',
            capacity: 0,
            workoutStartDate: '',
            workoutEndDate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={WorkoutSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <TextField
                margin="normal"
                fullWidth
                id="workoutName"
                label="Workout name"
                name="workoutName"
                autoFocus
                value={values.workoutName}
                onChange={handleChange}
                error={touched.workoutName && Boolean(errors.workoutName)}
                helperText={touched.workoutName && errors.workoutName}
              />
              <TextField
                margin="normal"
                fullWidth
                id="trainerUsername"
                label="Trainer username"
                name="trainerUsername"
                autoFocus
                value={values.trainerUsername}
                onChange={handleChange}
                error={
                  touched.trainerUsername && Boolean(errors.trainerUsername)
                }
                helperText={touched.trainerUsername && errors.trainerUsername}
              />
              <TextField
                margin="normal"
                fullWidth
                id="roomNumber"
                label="Room number"
                name="roomNumber"
                autoFocus
                value={values.roomNumber}
                onChange={handleChange}
                error={touched.roomNumber && Boolean(errors.roomNumber)}
                helperText={touched.roomNumber && errors.roomNumber}
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
              <TextField
                margin="normal"
                fullWidth
                id="workoutStartDate"
                label="Workout start date"
                name="workoutStartDate"
                autoFocus
                value={values.workoutStartDate}
                onChange={handleChange}
                error={
                  touched.workoutStartDate && Boolean(errors.workoutStartDate)
                }
                helperText={touched.workoutStartDate && errors.workoutStartDate}
                type="date"
              />
              <TextField
                margin="normal"
                fullWidth
                id="workoutEndDate"
                label="Workout end date"
                name="workoutEndDate"
                autoFocus
                value={values.workoutEndDate}
                onChange={handleChange}
                error={touched.workoutEndDate && Boolean(errors.workoutEndDate)}
                helperText={touched.workoutEndDate && errors.workoutEndDate}
                type="date"
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
