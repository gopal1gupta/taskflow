import { useEffect, useState } from "react";

import UploadDialog from "../../components/uploads/UploadDialog";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  deleteUpload,
  getUploads,
  type Upload,
} from "../../services/upload.service";

const Uploads = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadUploads = async () => {
    try {
      setLoading(true);

      const data = await getUploads();

      setUploads(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUploads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this file?")) return;

    try {
      await deleteUpload(id);
      loadUploads();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <UploadDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onUploaded={loadUploads}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4">
          My Files
        </Typography>

        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          Upload File
        </Button>
      </Stack>

      {uploads.length === 0 && (
        <Alert severity="info">
          No uploaded files found.
        </Alert>
      )}

      <Stack spacing={2}>
        {uploads.map((file) => (
          <Card key={file.id}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6">
                    {file.file_name}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    {file.content_type}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {(file.file_size / 1024).toFixed(2)} KB
                  </Typography>
                </Box>

                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    href={file.s3_url}
                    target="_blank"
                  >
                    View
                  </Button>

                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      handleDelete(file.id)
                    }
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Uploads;