import { Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: Props) {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        textAlign="center"
        mb={4}
      >
        {subtitle}
      </Typography>
    </>
  );
}