import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";

function InstructorsStatus({
  instructorsStatus,
  selectedInstructor,
  setSelectedInstructor,
}: any) {
  const statusList =
    instructorsStatus.length > 0
      ? instructorsStatus.map((status: any) => {
          return (
            <TableRow
              key={`status-table-row${status.name}`}
              onClick={() => {
                console.log(status.id);
                setSelectedInstructor(status.id);
              }}
              selected={selectedInstructor === status.id}
            >
              <TableCell>{status.name}</TableCell>
              <TableCell align="right">{status["remaining-reports"]}</TableCell>
            </TableRow>
          );
        })
      : [];

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Instructor Name</TableCell>
              <TableCell align="right">Reports Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{statusList}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default InstructorsStatus;
