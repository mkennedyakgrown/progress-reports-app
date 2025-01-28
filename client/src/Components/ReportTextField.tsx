import { TextField } from "@mui/material";

function ReportTextField({ reportText, handleTextChange, reportType }) {
  let placeholderText = "";
  if (reportType === "Student") {
    placeholderText = "Write about student's progress";
  } else if (reportType === "Course") {
    placeholderText = "Write about class summary";
  }

  return (
    <TextField
      label={`${reportType} Report`}
      placeholder={placeholderText}
      multiline
      minRows={4}
      fullWidth
      value={reportText}
      onChange={(event) => handleTextChange(event.target.value)}
    />
  );
}

export default ReportTextField;
