import { ListItem, Box, ListItemText, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function ReportsReport({ currentInstructor, report, handleUpdateReport }) {
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

      // Check if undoTextStackPointer is pointing to earlier version of text
      if (undoStackPointer.current < undoStack.length - 1) {
        // If so, check if the text is different from the current text
        if (undoStack[undoStackPointer.current] != currentReportText) {
          // If text is different, slice the stack to current version and then add the new text, then increment the pointer
          setUndoStack([
            ...undoStack.slice(0, undoStackPointer.current + 1),
            currentReportText,
          ]);
          undoStackPointer.current = undoStackPointer.current + 1;
        }
      } else {
        // If pointer is at the end of the stack, add the new text and increment the pointer
        setUndoStack([...undoStack, currentReportText]);
        undoStackPointer.current = undoStackPointer.current + 1;
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
      <Box display="flex" justifyContent="space-between">
        <ListItemText
          primary={`${report.student.first_name} ${report.student.last_name}`}
          secondary={`${report.course.name}`}
        />
        <Box display="block">
          <Button type="button" onClick={handleUndo}>
            <UndoIcon />
          </Button>
          <Button type="button" onClick={handleRedo}>
            <RedoIcon />
          </Button>
        </Box>
      </Box>
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
