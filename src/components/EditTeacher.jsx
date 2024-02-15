import { forwardRef, useState } from 'react';

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
  Slide,
  Stack,
  TextField,
} from '@mui/material';
import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { editTeacher } from '../app/teacher/teacherSlice';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EditTeacher = ({ openEdit, setOpenEdit, teacherEdit }) => {
  const [teacher, setTeacher] = useState(teacherEdit);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTeacher(teacher));
    setOpenEdit(false);
    setTeacher({
      ...teacher,
      firstName: '',
      lastName: '',
      age: '',
      group: '',
      level: '',
    });
  };

  return (
    <Dialog
      open={openEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenEdit(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add teacher</DialogTitle>
      <DialogContent>
        <form style={{ width: '400px' }}>
          <Stack sx={{ paddingBottom: '24px' }}>
            <TextField
              label="Firstname"
              variant="standard"
              id="firstName"
              name="firstName"
              value={teacher.firstName}
              onChange={(e) =>
                setTeacher({
                  ...teacher,
                  firstName: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: '24px' }}>
            <TextField
              label="Lastname"
              variant="standard"
              id="lastName"
              name="lastName"
              value={teacher.lastName}
              onChange={(e) =>
                setTeacher({
                  ...teacher,
                  lastName: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: '24px' }}>
            <TextField
              label="Age"
              variant="standard"
              id="age"
              name="age"
              value={teacher.age}
              onChange={(e) =>
                setTeacher({
                  ...teacher,
                  age: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: '24px' }}>
            <FormControl fullWidth>
              <InputLabel id="group">Group</InputLabel>
              <Select
                labelId="group"
                id="group"
                name="group"
                value={teacher.group}
                label="group"
                onChange={(e) =>
                  setTeacher({
                    ...teacher,
                    group: e.target.value,
                  })
                }
              >
                <MenuItem value="React N32">React N32</MenuItem>
                <MenuItem value="React N45">React N45</MenuItem>
                <MenuItem value="React N50">React N50</MenuItem>
                <MenuItem value="React N58">React N58</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack sx={{ paddingBottom: '24px' }}>
            <FormControl fullWidth>
              <InputLabel id="level">Level</InputLabel>
              <Select
                labelId="level"
                id="level"
                name="level"
                value={teacher.level}
                label="level"
                onChange={(e) =>
                  setTeacher({
                    ...teacher,
                    level: e.target.value,
                  })
                }
              >
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Middle">Middle</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack sx={{ paddingBottom: '24px' }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                id="avatar"
                name="avatar"
                onChange={(e) =>
                  setTeacher({
                    ...teacher,
                    avatar: e.target.files && e.target.files[0],
                  })
                }
              />
            </Button>
            <div>{teacher.avatar && teacher.avatar.name}</div>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEdit(false)} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeacher;
