import { ListItem, Box, ListItemText, Button, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useEffect, useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function CourseReport({
  report = {
    id: 0,
    course_id: 0,
    instructor_id: 0,
    report_text: "",
    date: "",
  },
  handleTextChange,
}: any) {
  const [reportText, setReportText] = useState(report.report_text);
  const [undoStack, setUndoStack] = useState([report.report_text]);
  const { current } = useRef({ report, timer: 0 });
  const undoStackPointer = useRef(0);

  useEffect(() => {
    setReportText(report.report_text);
    setUndoStack([report.report_text]);
  }, [report]);

  function onTextChange(currentReportText: string) {
    handleTextChange(
      currentReportText,
      report,
      setReportText,
      current,
      handleUndoRedo,
      "course"
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
      <Box id="report-name" display="flex" justifyContent="space-between">
        <ListItemText primary={"Class Summary"} />
        <Stack direction="column">
          <Button type="button" onClick={onUndo}>
            <UndoIcon />
            <h4>undo</h4>
          </Button>
          <Button type="button" onClick={onRedo}>
            <RedoIcon />
            <h4>redo</h4>
          </Button>
        </Stack>
      </Box>
      <Box
        id="report-box"
        component="form"
        sx={{ width: "100%" }}
        autoComplete="off"
      >
        <ReportTextField
          {...{
            reportText,
            onTextChange,
            reportType: "Course",
          }}
        />
      </Box>
    </ListItem>
  );
}

export default CourseReport;
