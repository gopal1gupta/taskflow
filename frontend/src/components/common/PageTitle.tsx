import { Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitle({
  title,
  subtitle,
}: Props) {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 4 }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
}