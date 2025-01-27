import { ListItem, Box, ListItemText } from "@mui/material";
import { useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function CourseReport({ course, handleUpdateCourseReport }) {
  const [reportText, setReportText] = useState(course.report_text);
  const { current } = useRef({ reportText, timer: 0 });

  function handleUpdateRequest(currentReportText) {
    console.log("Updating course report...", course.id);
    fetch(`http://localhost:3000/courses/${course.id}`, {
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
        handleUpdateCourseReport(data.report_text);
      })
      .catch((error) => console.error("Error patching course report:", error));
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
        primary={`${course.department} ${course.level}`}
        secondary={`Class Summary`}
      />
      <Box component="form" sx={{ width: "100%" }} autoComplete="off">
        <ReportTextField
          {...{
            reportText: reportText,
            handleTextChange,
            reportType: "Course",
          }}
        />
      </Box>
    </ListItem>
  );
}

export default CourseReport;
