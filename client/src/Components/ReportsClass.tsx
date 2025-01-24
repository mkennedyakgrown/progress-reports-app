import { List, ListItem } from "@mui/material";
import ReportsReport from "./ReportsReport";

function ReportsClass({ courses, students, reports }) {
  return (
    <>
      <List>
        {reports.map((report) => {
          return (
            <ReportsReport
              key={`course${report.course_id}student${report.student_id}`}
              {...{ report }}
            />
          );
        })}
      </List>
    </>
  );
}

export default ReportsClass;
