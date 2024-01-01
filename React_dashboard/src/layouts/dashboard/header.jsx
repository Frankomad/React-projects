import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; // Import Typography
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { useData } from '../../DataContext';
import { useAuth } from '../../AuthContext';

import { NAV, HEADER } from './config-layout';

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const { setGlobalData } = useData();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null); // State for last updated time

  const runScript = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/run-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data.Data);

      setGlobalData(data.Data);
      setLastUpdated(new Date().toLocaleString()); // Set the last updated time
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Call the logout function from the authentication context
    logout();
  };

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Button variant="contained" color="primary" style={{ marginRight: "15px" }} onClick={handleLogout}>
        Logout
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={runScript}
        disabled={loading}
        sx={{ position: 'relative' }}
      >
        {loading && (
          <CircularProgress
            size={24}
            sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }}
          />
        )}
        {loading ? 'Updating...' : 'Update!'}
      </Button>

      {/* Display the last updated time */}
      {lastUpdated && (
        <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
          Last updated at: {lastUpdated}
        </Typography>
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
