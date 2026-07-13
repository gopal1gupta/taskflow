import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TaskFlow
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Gopal</Typography>

          <Avatar>G</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;