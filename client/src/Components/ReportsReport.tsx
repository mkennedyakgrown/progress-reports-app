import { ListItem, Box, ListItemText, Button } from "@mui/material";
import { useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function ReportsReport({ report, handleUpdateReport }) {
  const [reportText, setReportText] = useState(report.report_text);
  const [undoStack, setUndoStack] = useState([report.report_text]);
  const { current } = useRef({ reportText, timer: 0 });
  const undoStackPointer = useRef(0);

  function handleUpdateRequest(currentReportText) {
    console.log("Updating report...", report.id);
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

  function handleTextChange(currentReportText: string) {
    setReportText(currentReportText);

    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.timer = 0;

      if (undoStackPointer.current < undoStack.length - 1) {
        if (undoStack[undoStackPointer.current] != currentReportText) {
          setUndoStack([
            ...undoStack.slice(0, undoStackPointer.current + 2),
            currentReportText,
          ]);
          undoStackPointer.current = undoStackPointer.current + 1;
          console.log("Add text after undos");
        } else {
          console.log("Undo alone");
        }
      } else {
        setUndoStack([...undoStack, currentReportText]);
        undoStackPointer.current = undoStackPointer.current + 1;
        console.log("Add text with no undos");
      }

      handleUpdateRequest(currentReportText);
    }, 5000);
  }

  function handleUndo() {
    if (undoStackPointer.current > 0) {
      undoStackPointer.current -= 1;
      handleTextChange(undoStack[undoStackPointer.current]);
    }
  }

  function handleRedo() {
    if (undoStackPointer.current < undoStack.length - 1) {
      undoStackPointer.current += 1;
      handleTextChange(undoStack[undoStackPointer.current]);
    }
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={`${report.student_name}`}
        secondary={`${report.course_name}`}
      />
      <Box component="form" sx={{ width: "100%" }} autoComplete="off">
        <ReportTextField
          {...{
            reportText: reportText,
            handleTextChange,
            reportType: "Student",
          }}
        />
        <Button type="button" onClick={handleUndo}>
          Undo
        </Button>
        <Button type="button" onClick={handleRedo}>
          Redo
        </Button>
      </Box>
    </ListItem>
  );
}

export default ReportsReport;
