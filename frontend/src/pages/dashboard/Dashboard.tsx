import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import useCurrentUser from "../../hooks/useCurrentUser";

export default function Dashboard() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <Typography variant="h6">
        Loading Dashboard...
      </Typography>
    );
  }

  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={5}>
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {greeting}
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Welcome back,
          <strong>
            {" "}
            {user?.username}
          </strong>
        </Typography>

        <Typography
          color="text.secondary"
          mt={0.5}
        >
          Here's what's happening today.
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid
        container
        spacing={3}
        mb={5}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    color="text.secondary"
                  >
                    Total Tasks
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                  >
                    --
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    bgcolor: "#1976d2",
                    width: 56,
                    height: 56,
                  }}
                >
                  <AssignmentIcon />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    color="text.secondary"
                  >
                    Uploaded Files
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                  >
                    --
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    bgcolor: "#2e7d32",
                    width: 56,
                    height: 56,
                  }}
                >
                  <CloudUploadIcon />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    color="text.secondary"
                  >
                    Completed Tasks
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                  >
                    --
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    bgcolor: "#ed6c02",
                    width: 56,
                    height: 56,
                  }}
                >
                  <CheckCircleIcon />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Profile */}
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Profile
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            mb={2}
          >
            <Chip
              label="Authenticated"
              color="success"
            />

            <Chip
              label="AWS Cognito"
              color="primary"
            />
          </Stack>

          <Typography>
            <strong>Username:</strong>{" "}
            {user?.username}
          </Typography>

          <Typography>
            <strong>User ID:</strong>{" "}
            {user?.sub}
          </Typography>

          <Typography>
            <strong>Client ID:</strong>{" "}
            {user?.client_id}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}