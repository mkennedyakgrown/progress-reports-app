import { Box, List } from "@mui/material";
import ReportsReport from "./ReportsReport";
import CourseReport from "./CourseReport";
import { useEffect, useState } from "react";

function ReportsClass({
  course,
  handleUpdateReport,
  handleUpdateCourseReport,
}) {
  const [courseReports, setCourseReports] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reportsByCourse/${course.id}`)
      .then((response) => response.json())
      .then((reportsData) => setCourseReports(reportsData))
      .catch((error) => console.error("Error fetching course reports:", error));
  }, []);

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
