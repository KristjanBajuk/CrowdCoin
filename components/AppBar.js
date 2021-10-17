import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Router} from '../routes';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>Router.push("/")}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography style={{cursor: 'pointer'}}   onClick={()=>Router.push("/")} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CrowdCoin
          </Typography>
          <Button color="inherit" onClick={()=>Router.push("/campaigns/new")}>New campaign</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}