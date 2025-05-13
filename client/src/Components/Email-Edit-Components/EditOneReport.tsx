import { Box, Button, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function EditOneReport({ report, student, setStudent }: any) {
  const [reportText, setReportText] = useState(report.report_text);

  useEffect(() => {
    setReportText(report.course_name);
  }, [report]);

  function handleSave(report: any) {
    fetch(
      `http://progress-reports-app.onrender.com/api/student-reports/${report.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report_text: reportText,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const reports = student.student_reports.map((p: any) => {
          if (p.id === data.id) {
            return data;
          } else {
            return p;
          }
        });
        setStudent({ ...student, reports: reports });
      });
  }

  function handleCancel() {
    setReportText(report.report_text);
  }

  function onTextChange(newText: string) {
    setReportText(newText);
  }
  return (
    <Box
      key={report.id}
      sx={{
        borderRadius: "5px",
        border: "1px solid rgb(0, 255, 221)",
        padding: "5px",
      }}
    >
      <Chip label={`${report.course.name} - ${report.instructor.signature}`} />
      <TextField
        id="report-text"
        placeholder={"Add a new report"}
        fullWidth
        multiline
        value={reportText}
        onChange={(event) => onTextChange(event.target.value)}
      />
      <Button
        type="button"
        variant="contained"
        onClick={() => handleSave(report)}
      >
        Save
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </Box>
  );
}

export default EditOneReport;
