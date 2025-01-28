import { Box, Divider, List } from "@mui/material";
import ReportsReport from "./ReportsReport";
import CourseReport from "./CourseReport";

function ReportsClass({
  course,
  courseReports,
  handleUpdateReport,
  handleUpdateCourseReport,
}) {
  return (
    <Box sx={{ width: "100%", borderRadius: 5, border: "1px solid #ccc" }}>
      <h2>
        {course.department} {course.level}
      </h2>
      <List>
        <CourseReport {...{ course, handleUpdateCourseReport }} />
        {courseReports.map((report) => {
          return (
            <ReportsReport
              key={`course${report.course_id}student${report.student_id}`}
              {...{ report, handleUpdateReport }}
            />
          );
        })}
      </List>
    </Box>
  );
}

export default ReportsClass;
