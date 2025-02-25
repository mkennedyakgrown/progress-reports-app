import { Box, List } from "@mui/material";
import StudentReport from "./StudentReport";
import CourseReport from "./CourseReport";

function ReportsClass({ course, handleTextChange }: any) {
  const displayReports = course
    ? course.student_reports.map((report: any) => {
        return (
          <StudentReport
            key={`course${report.course_id}student${report.student_id}`}
            {...{ report, handleTextChange }}
          />
        );
      })
    : null;

  return (
    <Box
      id="course-box"
      sx={{ width: "100%", borderRadius: 5, border: "1px solid #ccc" }}
    >
      <h2>{course.name}</h2>
      <List>
        <CourseReport
          key={`course-report${course.course_reports[0].id}`}
          {...{
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
