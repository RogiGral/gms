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

interface CreateMembershipForm {
  name: string;
  price: number;
  numberOfMonths: number;
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

const MembershipSchema = Yup.object().shape({
  name: Yup.string().required('Please enter membership name'),
  price: Yup.number()
    .required('Please enter price')
    .moreThan(0, 'Price must be positive'),
  numberOfMonths: Yup.number()
    .required('Please enter number of months')
    .moreThan(0, 'Price must be positive'),
});

export default function CreateMembershipModal({ open, handleClose }: Props) {
  const createWorkoutMutation = useMutation(
    ({ name, price, numberOfMonths }: CreateMembershipForm) => {
      return Api.Memberships.createMembership(name, price, numberOfMonths);
    },
    {
      onError: (error: Error) => {
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success('Membership has been created');
      },
    },
  );

  const handleSubmit = ({
    name,
    price,
    numberOfMonths,
  }: CreateMembershipForm) => {
    createWorkoutMutation.mutate({
      name,
      price,
      numberOfMonths,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 style={{ marginTop: 0 }}>Create membership</h2>
        <Formik
          initialValues={{
            name: '',
            price: 0,
            numberOfMonths: 0,
          }}
          onSubmit={handleSubmit}
          validationSchema={MembershipSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Workout name"
                name="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                margin="normal"
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoFocus
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
              <TextField
                margin="normal"
                fullWidth
                id="numberOfMonths"
                label="Number of months"
                name="numberOfMonths"
                autoFocus
                value={values.numberOfMonths}
                onChange={handleChange}
                error={touched.numberOfMonths && Boolean(errors.numberOfMonths)}
                helperText={touched.numberOfMonths && errors.numberOfMonths}
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
