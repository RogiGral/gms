import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { Link } from 'react-router-dom';
import { UserRole } from '../../../api/models';

interface Props {
  userRole: UserRole;
}

interface DrawerListItem {
  icon: React.ReactNode;
  text: string;
  path: string;
}

// user - workout i membership
// trener - users, workouts, swój profil
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
  const renderItems = () => {
    return items[userRole].map(({ icon, text, path }) => {
      return (
        <ListItemButton component={Link} to={`/dashboard/${path}`}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      );
    });
  };

  return <>{renderItems()}</>;
}
