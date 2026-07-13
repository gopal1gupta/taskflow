import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  value: string | number;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mt: 2 }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}