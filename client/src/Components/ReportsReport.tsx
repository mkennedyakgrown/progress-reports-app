import { ListItem, TextField, Box } from "@mui/material";
import { useRef, useState } from "react";

function ReportsReport({ report }) {
  const [reportText, setReportText] = useState(report.report_text);
  const { current } = useRef({ reportText, timer: 0 });

  function handleUpdateRequest() {
    console.log("Saving report...", reportText);
  }

  function handleTextChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setReportText(event.target.value);
    console.log(event.target.value);

    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.timer = 0;
      handleUpdateRequest();
    }, 1000);
  }

  return (
    <ListItem>
      <Box component="form" sx={{ width: "100%" }} autoComplete="off">
        <TextField
          label="Report"
          placeholder="Write about student's progress"
          multiline
          minRows={4}
          fullWidth
          value={reportText}
          onChange={handleTextChange}
        />
      </Box>
    </ListItem>
  );
}

export default ReportsReport;
