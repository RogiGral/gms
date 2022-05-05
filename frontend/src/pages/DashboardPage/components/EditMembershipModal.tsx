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
import { MembershipType } from '../../../api/models';

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedMembership: MembershipType;
}

interface EditMembershipForm {
  newName: string;
  newPrice: number;
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
  newName: Yup.string().required('Please enter membership name'),
  newPrice: Yup.number()
    .required('Please enter price')
    .moreThan(0, 'Price must be positive'),
  numberOfMonths: Yup.number()
    .required('Please enter number of months')
    .moreThan(0, 'Price must be positive'),
});

export default function EditMembershipModal({
  open,
  handleClose,
  selectedMembership,
}: Props) {
  const createWorkoutMutation = useMutation(
    ({ newName, newPrice, numberOfMonths }: EditMembershipForm) => {
      return Api.Memberships.editMembership(
        selectedMembership.name,
        newName,
        newPrice,
        numberOfMonths,
      );
    },
    {
      onError: (error: Error) => {
        // @ts-ignore
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success('Membership has been updated');
      },
    },
  );

  const handleSubmit = ({
    newName,
    newPrice,
    numberOfMonths,
  }: EditMembershipForm) => {
    createWorkoutMutation.mutate({
      newName,
      newPrice,
      numberOfMonths,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 style={{ marginTop: 0 }}>Create membership</h2>
        <Formik
          initialValues={{
            newName: selectedMembership.name,
            newPrice: selectedMembership.price,
            numberOfMonths: selectedMembership.numberOfMonths,
          }}
          onSubmit={handleSubmit}
          validationSchema={MembershipSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <TextField
                margin="normal"
                fullWidth
                id="newName"
                label="Workout newName"
                name="newName"
                autoFocus
                value={values.newName}
                onChange={handleChange}
                error={touched.newName && Boolean(errors.newName)}
                helperText={touched.newName && errors.newName}
              />
              <TextField
                margin="normal"
                fullWidth
                id="newPrice"
                label="Price"
                name="newPrice"
                autoFocus
                value={values.newPrice}
                onChange={handleChange}
                error={touched.newPrice && Boolean(errors.newPrice)}
                helperText={touched.newPrice && errors.newPrice}
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
