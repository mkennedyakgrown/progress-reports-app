import ReportsClass from "./ReportsClass";

function ReportsInstructor({ currentInstructor, instructorCourses = [] }) {
  function handleUpdateRequest(
    currentReportText: String,
    report,
    reportType: "course" | "student"
  ) {
    console.log(`Updating ${reportType} report...`, report.id);

    fetch(`http://localhost:5555/${reportType}-reports/${report.id}`, {
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
        console.log(`Report ${report.id} successfully saved`);
      })
      .catch((error) => console.error("Error patching report:", error));
  }

  function handleTextChange(
    currentReportText: string,
    report,
    reportText,
    setReportText,
    current,
    handleUndoRedo
  ) {
    console.log(`Updating ${report} with text ${currentReportText}`);
    setReportText(currentReportText);

    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.timer = 0;

      handleUndoRedo(currentReportText);

      //   // Check if undoTextStackPointer is pointing to earlier version of text
      //   if (undoStackPointer.current < undoStack.length - 1) {
      //     // If so, check if the text is different from the current text
      //     if (undoStack[undoStackPointer.current] != report.report_text) {
      //       // If text is different, slice the stack to current version and then add the new text, then increment the pointer
      //       setUndoStack([
      //         ...undoStack.slice(0, undoStackPointer.current + 1),
      //         report.report_text,
      //       ]);
      //       undoStackPointer.current = undoStackPointer.current + 1;
      //     }
      //   } else {
      //     // If pointer is at the end of the stack, add the new text and increment the pointer
      //     setUndoStack([...undoStack, report.report_text]);
      //     undoStackPointer.current = undoStackPointer.current + 1;
      //   }

      handleUpdateRequest(currentReportText, report, "course");
    }, 5000);
  }

  return (
    <>
      {instructorCourses.length > 0
        ? instructorCourses.map((course) => {
            return (
              <ReportsClass
                key={`course${course.id}`}
                {...{
                  currentInstructor,
                  course,
                  handleTextChange,
                }}
              />
            );
          })
        : null}
    </>
  );
}

export default ReportsInstructor;
