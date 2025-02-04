import { Box, List } from "@mui/material";
import ReportsReport from "./ReportsReport";
import CourseReport from "./CourseReport";

function ReportsClass({
  currentInstructor,
  course,
  handleUpdateReport,
  handleUpdateCourseReport,
}) {
  const displayReports = course
    ? course.student_reports
        .filter((report) => {
          return report.instructor_id == currentInstructor.id;
        })
        .map((report) => {
          return (
            <ReportsReport
              key={`course${report.course_id}student${report.student_id}`}
              {...{ currentInstructor, report, handleUpdateReport }}
            />
          );
        })
    : null;

  return (
    <Box sx={{ width: "100%", borderRadius: 5, border: "1px solid #ccc" }}>
      <h2>{course.name}</h2>
      <List>
        <CourseReport
          {...{ currentInstructor, course, handleUpdateCourseReport }}
        />
        {displayReports}
      </List>
    </Box>
  );
}

export default ReportsClass;
