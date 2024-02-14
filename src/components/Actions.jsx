import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';

const Actions = ({ handleEdit, handleDelete, studentId }) => {
  return (
    <Stack direction="row" spacing={3}>
      <IconButton color="warning" onClick={() => handleEdit(studentId)}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={() => handleDelete(studentId)}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default Actions;
