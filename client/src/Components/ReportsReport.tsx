import { TextField } from "@mui/material";
import { useRef, useState } from "react";

function ReportsReport() {
  const [reportText, setReportText] = useState("");
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
