import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  AppBar,
  Toolbar,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Task, getTask, createTask, updateTask } from '../../services/taskService';

// Validation schema
const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  description: yup
    .string(),
  effort_days: yup
    .number()
    .positive('Effort must be a positive number')
    .required('Effort is required'),
  due_date: yup
    .date()
    .required('Due date is required')
});

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = Boolean(id);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      effort_days: 1,
      due_date: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!user) return;

      try {
        setLoading(true);
        const taskData: Task = {
          ...values,
          user_id: user.id,
          due_date: values.due_date.toISOString().split('T')[0]
        };

        if (isEditMode && id) {
          await updateTask(parseInt(id), taskData);
        } else {
          await createTask(taskData);
        }
        
        navigate('/tasks');
      } catch (err: any) {
        setError(err.message || 'Failed to save task. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!isEditMode || !id) return;
      
      try {
        setLoading(true);
        const task = await getTask(parseInt(id));
        formik.setValues({
          title: task.title,
          description: task.description || '',
          effort_days: task.effort_days,
          due_date: new Date(task.due_date),
        });
      } catch (err: any) {
        setError('Failed to fetch task details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, isEditMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography component="h1" variant="h5" gutterBottom>
            {isEditMode ? 'Edit Task' : 'Create New Task'}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {loading && !formik.isSubmitting ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Task Title"
                name="title"
                autoFocus
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              
              <TextField
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="effort_days"
                label="Effort to Complete (Days)"
                name="effort_days"
                type="number"
                inputProps={{ min: 1 }}
                value={formik.values.effort_days}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.effort_days && Boolean(formik.errors.effort_days)}
                helperText={formik.touched.effort_days && formik.errors.effort_days}
              />
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={formik.values.due_date}
                  onChange={(newValue: Date | null) => {
                    if (newValue) {
                      formik.setFieldValue('due_date', newValue);
                    }
                  }}
                  slotProps={{
                    textField: {
                      margin: 'normal',
                      fullWidth: true,
                      required: true,
                      error: formik.touched.due_date && Boolean(formik.errors.due_date),
                      helperText: formik.touched.due_date && formik.errors.due_date as string
                    }
                  }}
                />
              </LocalizationProvider>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/tasks')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress size={24} />
                  ) : isEditMode ? 'Update Task' : 'Create Task'}
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default TaskForm; 