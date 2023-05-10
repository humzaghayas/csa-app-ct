import * as React from 'react';

// importing material UI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <AppBar position="">
      <Toolbar isBold={true}>
        {/* <Text.Subheadline as="h4" isBold={true} tone="positive">
          CUSTOMER SERVICE DASHBOARD
        </Text.Subheadline> */}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CUSTOMER SERVICE DASHBOARD
        </Typography>

        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}
