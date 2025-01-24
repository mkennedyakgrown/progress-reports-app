import { ListItem, Box, ListItemText } from "@mui/material";
import { useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function ReportsReport({ report, handleReportPatch }) {
  const [reportText, setReportText] = useState(report.report_text);
  const { current } = useRef({ reportText, timer: 0 });

  function handleUpdateRequest() {
    fetch(`http://localhost:3000/reports/${report.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_text: reportText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleReportPatch(data);
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
      handleUpdateRequest();
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
