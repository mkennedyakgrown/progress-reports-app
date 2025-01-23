import { List, ListItem } from "@mui/material";
import ReportsReport from "./ReportsReport";

function ReportsClass({ courses, students, reports }) {
  return (
    <>
      <ReportsReport />
      <List>
        {reports.map((report) => {
          return <ListItem key={report.id}>{report.report_text}</ListItem>;
        })}
      </List>
    </>
  );
}

export default ReportsClass;
