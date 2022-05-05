import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { UserRole } from '../../../api/models';
import { toast } from 'react-toastify';
import Session from '../../../api/Session';
import { useAppDispatch } from '../../../reduxHooks';
import { clearAuth } from '../../../reducers/authReducer';

interface Props {
  userRole: UserRole;
}

interface DrawerListItem {
  icon: React.ReactNode;
  text: string;
  path: string;
}

// user - workout i membership, profil
// trener - users, workouts, profil
// admin - users, workouts, memberships

const items: { [key in UserRole]: DrawerListItem[] } = {
  ROLE_USER: [
    {
      icon: <FitnessCenterIcon />,
      text: 'Workout',
      path: 'workout',
    },
    {
      icon: <CreditCardIcon />,
      text: 'Membership',
      path: 'membership',
    },
    {
      icon: <DashboardIcon />,
      text: 'Profile',
      path: 'profile',
    },
  ],
  ROLE_COACH: [
    {
      icon: <PeopleIcon />,
      text: 'Users',
      path: 'users',
    },
    {
      icon: <FitnessCenterIcon />,
      text: 'Workouts',
      path: 'workout',
    },
    {
      icon: <CreditCardIcon />,
      text: 'Membership',
      path: 'membership',
    },
    {
      icon: <DashboardIcon />,
      text: 'Profile',
      path: 'profile',
    },
  ],
  ROLE_ADMIN: [
    {
      icon: <PeopleIcon />,
      text: 'Users',
      path: 'users',
    },
    {
      icon: <FitnessCenterIcon />,
      text: 'Workouts',
      path: 'workout',
    },
    {
      icon: <RecentActorsIcon />,
      text: 'Memberships',
      path: 'membership',
    },
  ],
};

export default function DrawerList({ userRole }: Props) {
  const dispatch = useAppDispatch();

  const renderItems = () => {
    return items[userRole].map(({ icon, text, path }) => {
      return (
        <ListItemButton component={Link} to={`/dashboard/${path}`} key={path}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      );
    });
  };

  const logout = () => {
    Session.clearSession();
    dispatch(clearAuth());
    toast.success('Logged out');
  };

  return (
    <>
      {renderItems()}
      <ListItemButton component={Link} to="/">
        <ListItemIcon>
          <ArrowBackIcon />
        </ListItemIcon>
        <ListItemText primary="Landing page" />
      </ListItemButton>
      <ListItemButton component={Link} to="/" onClick={logout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </>
  );
}
