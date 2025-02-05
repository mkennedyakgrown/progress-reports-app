import React from "react";
import { Box, List } from "@mui/material";
// import StudentReport from "./StudentReport";
// import CourseReport from "./CourseReport";

function ReportsClass({
  currentInstructor,
  course,
  handleUpdateReport,
  handleUpdateCourseReport,
}) {
  const CourseReport = React.lazy(() => import("./CourseReport"));
  const StudentReport = React.lazy(() => import("./StudentReport"));

  const displayReports = course
    ? course.student_reports
        .filter((report) => {
          console.log(`Filtering student report ${report.course.name}`);
          return report.instructor_id == currentInstructor.id;
        })
        .map((report) => {
          console.log(`Loading Student Report ${report.student.name}`);
          return (
            <React.Suspense fallback={<>...</>}>
              <StudentReport
                key={`course${report.course_id}student${report.student_id}`}
                {...{ currentInstructor, report, handleUpdateReport }}
              />
            </React.Suspense>
          );
        })
    : null;

  return (
    <Box sx={{ width: "100%", borderRadius: 5, border: "1px solid #ccc" }}>
      <h2>{course.name}</h2>
      <List>
        <React.Suspense fallback={<>Loading...</>}>
          <CourseReport
            {...{ currentInstructor, course, handleUpdateCourseReport }}
          />
        </React.Suspense>
        {displayReports}
      </List>
    </Box>
  );
}

export default ReportsClass;
