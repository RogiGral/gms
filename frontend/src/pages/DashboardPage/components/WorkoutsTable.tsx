import React from 'react';
import { Workout as WorkoutType, Workout } from '../../../api/models';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button, { ButtonProps } from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

interface Props {
  workouts: Workout[];
  renderActionButton: (workoutId: number) => React.ReactNode;
  tableName: string;
}

export default function WorkoutsTable({
  workouts,
  renderActionButton,
  tableName,
}: Props) {
  const renderWorkoutsTableRows = (workoutsArr: WorkoutType[]) =>
    workoutsArr.map(workout => (
      <TableRow
        key={workout.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {workout.workoutName}
        </TableCell>
        <TableCell align="right">{workout.roomNumber}</TableCell>
        <TableCell align="right">
          {workout.workoutStartDate.toLocaleTimeString()}
        </TableCell>
        <TableCell align="right">
          {workout.workoutEndDate.toLocaleDateString()}
        </TableCell>
        <TableCell align="right">{workout.participantsNumber}</TableCell>
        <TableCell align="right">{renderActionButton(workout.id)}</TableCell>
      </TableRow>
    ));

  return (
    <>
      <h3>{tableName}</h3>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table aria-label="simple table" style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Workout name</TableCell>
              <TableCell align="right">Room number</TableCell>
              <TableCell align="right">Start date</TableCell>
              <TableCell align="right">End date</TableCell>
              <TableCell align="right">Participants number</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>{renderWorkoutsTableRows(workouts)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
