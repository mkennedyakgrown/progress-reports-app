import { ListItem, Box, ListItemText, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function StudentReport({ report, handleTextChange }) {
  const [reportText, setReportText] = useState(report.report_text);
  const [undoStack, setUndoStack] = useState([report.report_text]);
  const { current } = useRef({ reportText, timer: 0 });
  const undoStackPointer = useRef(0);

  function onTextChange(currentReportText: string) {
    handleTextChange(
      currentReportText,
      report,
      setReportText,
      current,
      handleUndoRedo
    );
  }

  function handleUndoRedo(currentReportText: string) {
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
  }

  function onUndo() {
    if (undoStackPointer.current > 0) {
      undoStackPointer.current -= 1;
      onTextChange(undoStack[undoStackPointer.current]);
    }
  }

  function onRedo() {
    if (undoStackPointer.current < undoStack.length - 1) {
      undoStackPointer.current += 1;
      onTextChange(undoStack[undoStackPointer.current]);
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
          <Button type="button" onClick={onUndo}>
            <UndoIcon />
            <h4>undo</h4>
          </Button>
          <Button type="button" onClick={onRedo}>
            <RedoIcon />
            <h4>redo</h4>
          </Button>
        </Box>
      </Box>
      <Box component="form" sx={{ width: "100%" }} autoComplete="off">
        <ReportTextField
          {...{
            reportText: reportText,
            onTextChange,
            reportType: "Student",
          }}
        />
      </Box>
    </ListItem>
  );
}

export default StudentReport;
