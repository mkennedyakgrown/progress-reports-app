import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function StudentEmailsList({
  students,
  selectedStudent,
  setSelectedStudent,
}: any) {
  const displayStudents =
    students.length > 0 &&
    students.map((student: any) => {
      return (
        <TableRow
          key={`status-table-row${student.id}`}
          onClick={() => setSelectedStudent(student.id)}
          selected={selectedStudent === student.id}
        >
          <TableCell>
            {student.first_name} {student.last_name}
          </TableCell>
          <TableCell align="right">
            {student.email_approved ? "Approved" : "Not Approved"}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
      <Table stickyHeader size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Student Name</b>
            </TableCell>
            <TableCell align="right">
              <b>Email Approved</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{displayStudents}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentEmailsList;
