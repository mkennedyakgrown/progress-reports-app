import { List } from "@mui/material";
import ReportsReport from "./ReportsReport";
import CourseReport from "./CourseReport";

function ReportsClass({
  course,
  courseReports,
  handleUpdateReport,
  handleUpdateCourseReport,
}) {
  return (
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
  );
}

export default ReportsClass;
