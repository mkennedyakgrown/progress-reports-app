import { CircularProgress } from "@mui/material";
import ReportsClass from "./ReportsClass";
import { useEffect, useRef, useState } from "react";
import { useBeforeUnload } from "react-router-dom";

function ReportsInstructor({ currentInstructorId }) {
  const [courses, setCourses] = useState([]);
  const isSaving = useRef(false);

  useEffect(() => {
    setCourses([]);
    if (currentInstructorId != "") {
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
    }
  }, [currentInstructorId]);

  useBeforeUnload(() => {
    if (isSaving.current) {
      alert("Oops! We're still saving your changes...");
    }
  });

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
      isSaving.current = true;
    }

    current.timer = setTimeout(() => {
      current.timer = 0;
      isSaving.current = false;

      handleUndoRedo(currentReportText);

      handleUpdateRequest(currentReportText, report, "course");
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
      ) : currentInstructorId ? (
        <>
          <h2>Retrieving Classes and Preparing Reports</h2>
          <CircularProgress />
        </>
      ) : (
        <h2>Welcome, Admin! Select an instructor to view their reports.</h2>
      )}
    </>
  );
}

export default ReportsInstructor;
