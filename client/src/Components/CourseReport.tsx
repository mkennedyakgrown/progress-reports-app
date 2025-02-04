import { ListItem, Box, ListItemText, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useEffect, useRef, useState } from "react";
import ReportTextField from "./ReportTextField";

function CourseReport({ currentInstructor, course, handleUpdateCourseReport }) {
  const [reportText, setReportText] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const { current } = useRef({ reportText, timer: 0 });
  const undoStackPointer = useRef(0);

  useEffect(() => {
    const initialText = course.course_reports.find((report) => {
      return report.instructor_id == currentInstructor.id;
    }).report_text;
    console.log(
      `CourseReport setting ReportText and UndoStack with initial values: ${initialText}`
    );
    setReportText(initialText);
    setUndoStack([initialText]);
  }, [currentInstructor]);

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
        <ListItemText primary={"Class Summary"} />
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
            reportType: "Course",
          }}
        />
      </Box>
    </ListItem>
  );
}

export default CourseReport;
