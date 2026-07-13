import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { uploadFile } from "../../services/upload.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onUploaded: () => void;
}

const UploadDialog = ({
  open,
  onClose,
  onUploaded,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadFile(file);

      onUploaded();
      onClose();
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Upload File</DialogTitle>

      <DialogContent>
        <Button variant="outlined" component="label" fullWidth>
          {file ? file.name : "Choose File"}

          <input
            hidden
            type="file"
            onChange={(e) =>
              setFile(e.target.files?.[0] ?? null)
            }
          />
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;