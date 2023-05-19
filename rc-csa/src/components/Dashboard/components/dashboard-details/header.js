import * as React from 'react';

// importing material UI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const barStyle = {
    height: '45x',
    width: '100%',
    display: 'block',
    alignItems: 'center',
    position: 'relative',
    padding: '0.5rem 0rem',
    backgroundColor: '#f2f2f2',
    color: 'black',
    textAlign: 'center'
}

export default function Header() {
  return (
    <div style={barStyle}>
      {/* <AppBar position="static"  classes={{ 
        root: classes.abRoot, 
        positionStatic: classes.abStatic 
      }}>
        <Toolbar isBold={true} >
          

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CUSTOMER SERVICE DASHBOARD
          </Typography>

          asdasdasd

        </Toolbar>
      </AppBar> */}

      CUSTOMER SERVICE DASHBOARD 
    </div>
  );
}
