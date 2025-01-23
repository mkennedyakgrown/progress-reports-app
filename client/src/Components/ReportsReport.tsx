import { TextField } from "@mui/material";
import { useState } from "react";

function ReportsReport() {
  const [reportText, setReportText] = useState("");

  function handleTextChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setReportText(event.target.value);
    console.log(reportText);
  }

  return (
    <>
      <form>
        <TextField
          label="Report"
          placeholder="Write about student's progress"
          multiline
          minRows={4}
          fullWidth
          value={reportText}
          onChange={handleTextChange}
        />
      </form>
    </>
  );
}

export default ReportsReport;
