import { ListItem, Box, ListItemText, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function ReportsReport({ report, handleUpdateReport }) {
  const [reportText, setReportText] = useState(report.report_text);
  const { current } = useRef({ reportText, timer: 0 });

  function handleUpdateRequest(currentReportText) {
    fetch(`http://localhost:3000/reports/${report.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_text: currentReportText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleUpdateReport(data.report_text);
      })
      .catch((error) => console.error("Error patching report:", error));
  }

  function handleTextChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setReportText(event.target.value);

    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.timer = 0;
      handleUpdateRequest(event.target.value);
    }, 1000);
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={`${report.course_name}`}
        secondary={`${report.student_name}`}
      />
      <Box component="form" sx={{ width: "100%" }} autoComplete="off">
        <ReportTextField
          {...{
            reportText: reportText,
            handleTextChange,
            reportType: "Student",
          }}
        />
      </Box>
    </ListItem>
  );
}

export default ReportsReport;
