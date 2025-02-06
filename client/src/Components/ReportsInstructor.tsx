import { CircularProgress } from "@mui/material";
import ReportsClass from "./ReportsClass";

function ReportsInstructor({ courses = [] }) {
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
    setReportText,
    current,
    handleUndoRedo
  ) {
    setReportText(currentReportText);

    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.timer = 0;

      handleUndoRedo(currentReportText);

      handleUpdateRequest(currentReportText, report, "course");
    }, 5000);
  }

  return (
    <>
      {courses.map((course) => {
        return (
          <ReportsClass
            key={`course${course.id}`}
            {...{
              course,
              handleTextChange,
            }}
          />
        );
      })}
    </>
  );
}

export default ReportsInstructor;
