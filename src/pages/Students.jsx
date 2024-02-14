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

import { Actions, Loader, AddStudent, EditStudent } from './../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent, fetchStudents } from './../app/student/studentSlice';

const Students = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [studentEdit, setStudentEdit] = useState({});

  const { loading, students, error } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [openAdd, openEdit]);

  const handleEdit = (studentId) => {
    const student = students.find((st) => st.id === studentId);
    setStudentEdit(student);
    setOpenEdit(true);
  };

  const handleDelete = (studentId) => {
    if (confirm('Are you sure you want to delete this student')) {
      dispatch(deleteStudent(studentId));
      dispatch(fetchStudents());
    }
  };

  return (
    <div>
      {openAdd && <AddStudent openAdd={openAdd} setOpenAdd={setOpenAdd} />}
      {openEdit && (
        <EditStudent
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          studentEdit={studentEdit}
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
        <Typography variant="h4">Students</Typography>
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
      {students.length > 0 ? (
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
                <TableCell>Teacher</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow
                  key={student.id}
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
                      src={student.avatar}
                      alt={student.firstName}
                    />
                  </TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.group}</TableCell>
                  <TableCell>{student.teacher}</TableCell>
                  <TableCell>
                    <Actions
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      studentId={student.id}
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

export default Students;
