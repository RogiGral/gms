import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import DrawerList from './components/DrawerList';
import { useAppSelector } from '../../reduxHooks';
import { useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Workout from './components/Workout';
import Membership from './components/Membership';
import Profile from './components/Profile';

const drawerWidth: number = 240;

const mdTheme = createTheme();

export default function Dashboard() {
  const { path, url } = useRouteMatch();
  const [open, setOpen] = useState(true);
  const user = useAppSelector(state => state.auth.user)!;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderContent = () => {
    return (
      <Switch>
        <Route exact path={`${path}/workout`}>
          <Workout />
        </Route>
        <Route exact path={`${path}/membership`}>
          <Membership />
        </Route>
        <Route exact path={`${path}/profile`}>
          <Profile />
        </Route>
        <Route exact path={`${path}/users`}>
          <div>users</div>
        </Route>
      </Switch>
    );
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} drawerWidth={drawerWidth}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <DrawerList userRole={user.role} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {renderContent()}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
