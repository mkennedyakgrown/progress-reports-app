import { List } from "@mui/material";
import ReportsReport from "./ReportsReport";

function ReportsClass({ courses, students, reports, handleReportPatch }) {
  return (
    <>
      <List>
        {reports.map((report) => {
          return (
            <ReportsReport
              key={`course${report.course_id}student${report.student_id}`}
              {...{ report, handleReportPatch }}
            />
          );
        })}
      </List>
    </>
  );
}

export default ReportsClass;
