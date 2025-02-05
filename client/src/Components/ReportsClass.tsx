import { Box, List } from "@mui/material";
import StudentReport from "./StudentReport";
import CourseReport from "./CourseReport";

function ReportsClass({ currentInstructor, course, handleTextChange }) {
  const displayReports = course
    ? course.student_reports.map((report) => {
        return (
          <StudentReport
            key={`course${report.course_id}student${report.student_id}`}
            {...{ currentInstructor, report, handleTextChange }}
          />
        );
      })
    : null;

  return (
    <Box sx={{ width: "100%", borderRadius: 5, border: "1px solid #ccc" }}>
      <h2>{course.name}</h2>
      <List>
        <CourseReport
          key={`course-report${course.course_reports[0].id}`}
          {...{
            currentInstructor,
            report: course.course_reports[0],
            handleTextChange,
          }}
        />
        {displayReports}
      </List>
    </Box>
  );
}

export default ReportsClass;
