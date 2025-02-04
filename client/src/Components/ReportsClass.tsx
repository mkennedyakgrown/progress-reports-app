import { Box, List } from "@mui/material";
import ReportsReport from "./ReportsReport";
import CourseReport from "./CourseReport";

function ReportsClass({
  course,
  handleUpdateReport,
  handleUpdateCourseReport,
}) {
  return (
    <Box sx={{ width: "100%", borderRadius: 5, border: "1px solid #ccc" }}>
      <h2>{course.name}</h2>
      <List>
        <CourseReport {...{ course, handleUpdateCourseReport }} />
        {course
          ? course.student_reports.map((report) => {
              return (
                <ReportsReport
                  key={`course${report.course_id}student${report.student_id}`}
                  {...{ report, handleUpdateReport }}
                />
              );
            })
          : null}
      </List>
    </Box>
  );
}

export default ReportsClass;
