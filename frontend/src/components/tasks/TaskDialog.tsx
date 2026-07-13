import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { createTask } from "../../services/task.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TaskDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState("MEDIUM");
  const [loading, setLoading] =
    useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      await createTask({
        title,
        description,
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Task</DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel>
            Priority
          </InputLabel>

          <Select
            value={priority}
            label="Priority"
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <MenuItem value="LOW">
              LOW
            </MenuItem>

            <MenuItem value="MEDIUM">
              MEDIUM
            </MenuItem>

            <MenuItem value="HIGH">
              HIGH
            </MenuItem>
          </Select>
        </FormControl>

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
        >
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}