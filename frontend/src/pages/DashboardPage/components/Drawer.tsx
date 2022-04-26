import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer/Drawer';

export interface DrawerProps extends MuiDrawerProps {
  drawerWidth: number;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default Drawer;
