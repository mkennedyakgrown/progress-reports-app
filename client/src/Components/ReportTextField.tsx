import { TextField } from "@mui/material";

function ReportTextField({ reportText, handleTextChange, reportType }) {
  return (
    <TextField
      label={`${reportType} Report`}
      placeholder="Write about student's progress"
      multiline
      minRows={4}
      fullWidth
      value={reportText}
      onChange={handleTextChange}
    />
  );
}

export default ReportTextField;
