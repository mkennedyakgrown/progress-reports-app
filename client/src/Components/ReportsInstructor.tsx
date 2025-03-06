import { CircularProgress } from "@mui/material";
import ReportsClass from "./ReportsClass";
import { useEffect, useRef, useState } from "react";
import { useBeforeUnload } from "react-router-dom";
import FilterCourses from "./FilterCourses";

function ReportsInstructor({ currentInstructorId }: any) {
  const [courses, setCourses] = useState([
    {
      id: 0,
      name: "",
      course_reports: [],
      student_reports: [],
    },
  ]);
  const [courseFilter, setCourseFilter] = useState("");
  const isSaving = useRef(false);

  useEffect(() => {
    setCourses([]);
    if (currentInstructorId != "") {
      console.log(`Fetching User ${currentInstructorId}`);
      fetch(
        `https://progress-reports-app.onrender.com/api/users/${currentInstructorId}/courses`
      )
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
    report: any,
    reportType: "course" | "student"
  ) {
    console.log(`Updating ${reportType} report...`, report.id);

    if (currentReportText.length > 3000) {
      alert("Your report is too long!");
    } else {
      fetch(
        `https://progress-reports-app.onrender.com/api/${reportType}-reports/${report.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            report_text: currentReportText,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(`Report ${data.id} successfully saved`);
        })
        .catch((error) => console.error("Error patching report:", error));
    }
  }

  function handleTextChange(
    currentReportText: string,
    report: any,
    setReportText: any,
    current: any,
    handleUndoRedo: any
  ) {
    if (currentReportText.length > 3000) {
      alert("Your report is too long!");
    } else {
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
  }

  const displayCourses =
    courses.length > 0
      ? courses.filter((course) =>
          course.name.toLowerCase().includes(courseFilter.toLowerCase())
        )
      : [];

  console.log("displayCourses: ", displayCourses);

  return (
    <>
      <FilterCourses {...{ setCourseFilter }} />
      {courses.length > 0 &&
      displayCourses.length > 0 &&
      displayCourses[0].id != 0 ? (
        displayCourses.map((course) => {
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
      ) : null}
    </>
  );
}

export default ReportsInstructor;
