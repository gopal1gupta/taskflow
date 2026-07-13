import { useEffect, useState } from "react";
import TaskDialog from "../../components/tasks/TaskDialog";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  deleteTask,
  getTasks,
  type Task,
} from "../../services/task.service";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // NEW
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);

      loadTasks();
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
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">
            My Tasks
          </Typography>

          <Button
            variant="contained"
            onClick={() => setDialogOpen(true)}
          >
            New Task
          </Button>
        </Stack>

        {tasks.length === 0 && (
          <Alert severity="info">
            No tasks found.
          </Alert>
        )}

        <Stack spacing={2}>
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">
                      {task.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      {task.description}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      mt={2}
                    >
                      <Chip
                        label={task.status}
                        color="primary"
                      />

                      <Chip
                        label={task.priority}
                        color="warning"
                      />
                    </Stack>
                  </Box>

                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        handleDelete(task.id)
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

      {/* Create Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={loadTasks}
      />
    </>
  );
};

export default Tasks;