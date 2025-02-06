import { CircularProgress } from "@mui/material";
import ReportsClass from "./ReportsClass";
import { useEffect, useState } from "react";

function ReportsInstructor({ currentInstructorId }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses([]);
    console.log(`Fetching User ${currentInstructorId}`);
    fetch(`http://localhost:5555/users/${currentInstructorId}/courses`)
      .then((response) => response.json())
      .then((coursesData) => {
        console.log(coursesData);
        setCourses(coursesData);
      })
      .catch((error) =>
        console.error(
          `Error fetching instructor id ${currentInstructorId}:`,
          error
        )
      );
  }, [currentInstructorId]);

  function handleUpdateRequest(
    currentReportText: String,
    report,
    reportType: "course" | "student",
    setIsSaving
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
        setIsSaving(false);
      })
      .catch((error) => console.error("Error patching report:", error));
  }

  function handleTextChange(
    currentReportText: string,
    report,
    setReportText,
    current,
    handleUndoRedo,
    setIsSaving
  ) {
    setReportText(currentReportText);

    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.timer = 0;
      setIsSaving(true);

      handleUndoRedo(currentReportText);

      handleUpdateRequest(currentReportText, report, "course", setIsSaving);
    }, 5000);
  }

  return (
    <>
      {courses.length > 0 ? (
        courses.map((course) => {
          return (
            <ReportsClass
              key={`course${course.id}`}
              {...{
                course,
                handleTextChange,
              }}
            />
          );
        })
      ) : (
        <>
          <h2>Retrieving Classes and Preparing Reports</h2>
          <CircularProgress />
        </>
      )}
    </>
  );
}

export default ReportsInstructor;
