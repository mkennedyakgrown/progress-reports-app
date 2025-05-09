import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function InstructorsStatus({ instructorsStatus }: any) {
  const statusList =
    instructorsStatus.length > 0
      ? instructorsStatus.map((status: any) => {
          return (
            <TableRow key={`status-table-row${status.name}`}>
              <TableCell onClick={() => handleClick(status.id)}>
                <Link href={`/reports/users/${status.id}`}>{status.name}</Link>
              </TableCell>
              <TableCell align="right">{status["remaining-reports"]}</TableCell>
            </TableRow>
          );
        })
      : [];

  const navigate = useNavigate();
  function handleClick(id: number) {
    navigate(`/reports/users/${id}`);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
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
