import { TextField } from "@mui/material";

function ReportTextField({ reportText, onTextChange, reportType }) {
  let placeholderText = "";
  if (reportType === "Student") {
    placeholderText = "Write about student's progress";
  } else if (reportType === "Course") {
    placeholderText = "Write about class summary";
  }

  return (
    <TextField
      id="report-text"
      label={`${reportType} Report`}
      placeholder={placeholderText}
      multiline
      minRows={4}
      fullWidth
      value={reportText}
      onChange={(event) => onTextChange(event.target.value)}
    />
  );
}

export default ReportTextField;
