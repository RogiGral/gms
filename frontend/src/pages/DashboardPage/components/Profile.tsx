import React from 'react';
import { useAppSelector } from '../../../reduxHooks';
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useMutation } from 'react-query';
import Api from '../../../api/Api';
import { toast } from 'react-toastify';

export default function Profile() {
  const user = useAppSelector(state => state.auth.user)!;

  const resetPasswordMutation = useMutation(
    ({ email }: { email: string }) => {
      return Api.Auth.resetPassword(email);
    },
    {
      onError: (error: Error) => {
        console.log('Error when resetting password:', error);
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success('Email sent successfully');
      },
    },
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <h2>Profile</h2>

      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-label="mailbox folders"
      >
        <ListItem sx={{ ':hover': { bgcolor: 'background.grey' } }}>
          <ListItemText primary="First name" secondary={user.firstName} />
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary="Last name" secondary={user.lastName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="User name" secondary={user.username} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Email" secondary={user.email} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => resetPasswordMutation.mutate({ email: user.email })}
        >
          <ListItemText
            primary="Reset password"
            sx={{
              color: 'error.main',
            }}
          />
        </ListItem>
      </List>
    </div>
  );
}
