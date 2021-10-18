import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link'
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
          <Link href="/">
          <Typography style={{cursor: 'pointer'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CrowdCoin
          </Typography>
          </Link>
          <Link href="/campaigns/new">
          <Button color="inherit">New campaign</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}