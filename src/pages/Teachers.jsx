import { useEffect, useState } from 'react';

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { Actions, Loader, AddTeacher, EditTeacher } from './../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeacher, fetchTeachers } from './../app/teacher/teacherSlice';

const Teachers = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [teacherEdit, setTeacherEdit] = useState({});

  const { loading, teachers, error } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [openAdd, openEdit]);

  const handleEdit = (teacherId) => {
    const teacher = teachers.find((st) => st.id === teacherId);
    setTeacherEdit(teacher);
    setOpenEdit(true);
  };

  const handleDelete = (teacherId) => {
    if (confirm('Are you sure you want to delete this teacher')) {
      dispatch(deleteTeacher(teacherId));
      dispatch(fetchTeachers());
    }
  };

  return (
    <div>
      {openAdd && <AddTeacher openAdd={openAdd} setOpenAdd={setOpenAdd} />}
      {openEdit && (
        <EditTeacher
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          teacherEdit={teacherEdit}
        />
      )}
      <Stack
        direction="row"
        sx={{
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Teachers</Typography>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add
        </Button>
      </Stack>

      {loading ? <Loader /> : null}
      {error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{ textAlign: 'center', paddingTop: '20px' }}
        >
          {error.message}
        </Typography>
      ) : null}
      {teachers.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Group</TableCell>
                
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow
                  key={teacher.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <img
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                      }}
                      src={teacher.avatar}
                      alt={teacher.firstName}
                    />
                  </TableCell>
                  <TableCell>{teacher.firstName}</TableCell>
                  <TableCell>{teacher.lastName}</TableCell>
                  <TableCell>{teacher.age}</TableCell>
                  <TableCell>{teacher.group}</TableCell>
                  <TableCell>{teacher.teacher}</TableCell>
                  <TableCell>
                    <Actions
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      teacherId={teacher.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default Teachers;
