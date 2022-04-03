import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Drawer, IconButton, Stack, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import pudzian from '../../assets/pudzian.png';
import { useHistory } from 'react-router';

const menuItems = [
  { text: 'Główna', path: '/#' },
  { text: 'O nas', path: '/#' },
  { text: 'Kursy', path: '/#' },
  { text: 'Plan zajęć', path: '/#' },
  { text: 'Cennik', path: '/#' },
  { text: 'Kontakt', path: '/#' },
  { text: 'Login', path: '/login' },
  { text: 'Rejestracja', path: '/register' },
];

export default function LandingPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();

  const renderMenuItems = () => {
    return menuItems.map(item => {
      return (
        <Button
          key={item.text}
          onClick={() => history.push(item.path)}
          sx={{
            color: 'white',
            fontFamily: 'Roboto Condensed',
            fontWeight: 700,
            fontSize: 24,
            textAlign: 'left',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {item.text}
        </Button>
      );
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ background: 'black', height: 64 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'white',
              fontFamily: 'Roboto Condensed',
              fontWeight: 700,
              fontSize: 36,
            }}
          >
            Pakiernia <span style={{ color: '#C11325' }}>Club</span>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div
          style={{
            width: 340,
            padding: '24px',
            height: '100%',
            background: '#C11325',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ color: 'white' }}
            onClick={() => setIsDrawerOpen(false)}
          >
            <CloseIcon style={{ width: 36, height: 36 }} />
          </IconButton>

          {renderMenuItems()}
        </div>
      </Drawer>

      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)',
          position: 'relative',
          background: 'black',
          overflow: 'hidden',
        }}
      >
        <img
          src={pudzian}
          alt="Wielki Polak"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            color: 'white',
            transform: 'scaleX(-1)',
            marginLeft: 160,
            filter: 'brightness(0.7)',
          }}
        />

        <div
          style={{
            width: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: 72,
            fontWeight: 700,
            paddingLeft: 128,
            paddingBottom: 256,
            textTransform: 'uppercase',
            fontFamily: 'Roboto Condensed',
          }}
        >
          <div>
            If you wanna to be a <span style={{ color: '#C11325' }}>lion</span>
          </div>
          <div>
            You need to train with{' '}
            <span style={{ color: '#C11325' }}>lions</span>
          </div>
        </div>
      </div>
    </>
  );
}
