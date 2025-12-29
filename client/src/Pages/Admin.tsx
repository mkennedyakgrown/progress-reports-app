import { useEffect, useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InstructorsStatus from "../Components/InstructorsStatus";
import Emails from "../Components/Emails";
import ReportEmails from "../Components/ReportEmails";
import StudentEmailsList from "../Components/StudentEmailsList";
import ReportsInstructor from "../Components/ReportsInstructor";

function Admin() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(-1);
  const [instructorsStatus, setInstructorsStatus] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(-1);
  const [leftSelectedOption, setLeftSelectedOption] = useState(
    "Instructor Reports Status"
  );

  useEffect(() => {
    fetch(`https://progress-reports-app.onrender.com/api/users/status`)
      .then((res) => res.json())
      .then((data) => {
        setInstructorsStatus(data);
      });
    fetch(`https://progress-reports-app.onrender.com/api/students`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  const leftSelectOption = ["Instructor Reports Status", "Student Emails"];

  return (
    <>
      <h1>Admin Page</h1>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <Select
              labelId="left-select-label"
              id="left-select"
              value={leftSelectedOption}
              label="Menu Options"
              onChange={(event) => setLeftSelectedOption(event.target.value)}
            >
              {leftSelectOption.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
            {leftSelectedOption === "Instructor Reports Status" ? (
              <InstructorsStatus
                {...{
                  instructorsStatus,
                  selectedInstructor,
                  setSelectedInstructor,
                }}
              />
            ) : (
              <StudentEmailsList
                {...{ students, selectedStudent, setSelectedStudent }}
              />
            )}
          </Grid>
          <Grid size={9}>
            {leftSelectedOption === "Instructor Reports Status" ? (
              selectedInstructor > -1 && (
                <ReportsInstructor
                  {...{ currentInstructorId: selectedInstructor }}
                />
              )
            ) : (
              <ReportEmails {...{ selectedStudent }} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Admin;
