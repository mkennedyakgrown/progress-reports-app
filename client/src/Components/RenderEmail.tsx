import DOMPurify from "dompurify";
import { Box, Button } from "@mui/material";

function RenderEmail({ student, setStudent }: any) {
  function createMarkup(dirty: any) {
    return { __html: DOMPurify.sanitize(dirty) };
  }

  const placementsText = student.placements
    ? student.placements
        .map((placement: any) => {
          return `<p style="font-family: Times; font-size: medium; text-align: center;">
      <strong>
        <span style="font-family: 'book antiqua', palatino; font-size: 12pt;">${placement.course_name}</span>
      </strong>
    </p>`;
        })
        .join("")
    : "";

  const suggestionsText = student.suggestions
    ? student.suggestions
        .map((suggestion: any) => {
          return `<p style="font-family: Times; font-size: medium; font-style: italic; text-align: center;">
          <span style="font-family: 'book antiqua', palatino; font-size: 12pt;">${suggestion.course_name}</span>
      </p>`;
        })
        .join("")
    : "";

  const reportsText =
    student.student_reports != undefined && student.student_reports.length > 0
      ? student.student_reports
          .filter(
            (report: any) =>
              report.report_text != " " && report.report_text != null
          )
          .map((student_report: any) => {
            const currReportTexts = [
              `<p style="font-family: Times; font-size: medium; text-align: center;">`,
            ];
            const course_report = student_report.course.course_reports.filter(
              (report: any) =>
                report.instructor_id == student_report.instructor_id
            )[0];
            if (course_report.report_text != " ") {
              currReportTexts.push(`<p style="font-family: Times; font-size: medium; text-align: center;">
                    <strong>
                        <span style="font-family: 'book antiqua', palatino; font-size: 12pt;">${course_report.report_text}
                        <br />
                        ${student_report.report_text}
                        </span>
                    </strong>
                    </p>
                    <p style="font-family: Times; font-size: large; text-align: center; font-style: italic;">
                        <strong>- ${course_report.instructor.signature}</strong>
                    </p>`);
            } else {
              currReportTexts.push(`<p style="font-family: Times; font-size: medium; text-align: center;">
                        <strong>
                            <span style="font-family: 'book antiqua', palatino; font-size: 12pt;">
                            ${student_report.report_text}
                            </span>
                        </strong>
                        </p>
                        <p style="font-family: Times; font-size: large; text-align: center; font-style: italic;">
                            <strong>- ${course_report.instructor.signature}</strong>
                        </p>`);
            }

            return currReportTexts.join("<br />");
          })
          .join("")
      : "";

  const headerText = `
    <div style="color:transparent;visibility:hidden;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important;">
      <img border="0" width="1" height="1" src="http://click.jackrabbittech.com/q/FRGTpfHhs6_mEUWyJsqhSg~~/AAB6yhA~/Yd-qdgHcGXpXRSQH-VajlkOj7rIyctXD0tjDHXICVDpCtkbIVnUwzMU57OpTZ08z0EW4IESyaiQeL-Y5q5tT_w~~" alt="" />
    </div>
    <p style="font-family: Times; font-size: medium;">
      <img style="display: block; margin-left: auto; margin-right: auto;" title="Broadway Bound 2025 - 2026.jpg" src="https://jackrabbitstorage.blob.core.windows.net/prod/org_515936/orgfile/Broadway%20Bound%202025%20-%202026_20250419160829.jpg" alt="Broadway Bound 2025 - 2026.jpg" width="455" height="256" />
    </p>
    <p style="font-family: Times; font-size: medium; text-align: center;">
      <span style="font-family: 'book antiqua', palatino;">
        <span style="font-size: 16px;">Below is a list of classes for the 2025|2026 season that ${student.first_name} ${student.last_name} is eligible to register for:</span>
      </span>
    </p>
  `;

  const suggestionsHeaderText = `
  <br />
    <p style="font-family: Times; font-size: medium;">
      <em>
        <span style="font-family: 'book antiqua', palatino;">
          <span style="font-size: 16px;">Additional Options &amp; Suggestions:</span>
        </span>
      </em>
    </p>
  <br />
  `;

  const centerText = `
  <br />
    <p style="font-family: Times; font-size: medium; text-align: center;">
      <span style="font-family: 'book antiqua', palatino;">
        <span style="font-size: 16px;"><strong>Registration will open Sunday June 1st, 2025.</strong></span>
      </span>
    </p>
    <p style="font-family: Times; font-size: medium; text-align: center;">
      <strong>
        <span style="font-family: 'book antiqua', palatino; font-size: 12pt;">Open House/Registration Day for the 2025|2026 season will be held on July 24th, 2025.</span>
      </strong>
    </p>
    <hr style="font-family: Times; font-size: medium;" />
    <p style="font-family: Times; font-size: medium; text-align: center;">
      &nbsp;
    </p>
    <p style="font-family: Times; font-size: medium; text-align: center;">
      <span style="font-family: 'book antiqua', palatino; font-size: 12pt;">If you have any questions regarding your student's placement and/or class curriculum, please contact&nbsp;
        <a href="mailto:info@performcenterstage.com">info@performcenterstage.com</a>
      </span>
    </p>
    <hr style="font-family: Times; font-size: medium;" />
    <p style="font-family: Times; font-size: medium;">
      &nbsp;&nbsp;
    </p>
    <p style="font-family: Times; font-size: medium;">
      <span style="font-family: 'book antiqua', palatino; font-size: 12pt;">Notes from their 2024 - 2025 instructor(s):</span>
    </p>
  `;

  const signatureText = `
    <br />
    <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0px 0px 1em; font-size: 13px; color: #3c73aa;">
      <em>
        <span style="font-family: georgia, palatino; font-size: 12pt;">Your CS Team<br /></span>
      </em>
    </p>
    <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0px 0px 1em; font-size: 13px; color: #3c73aa;">
      <span style="font-size: 10pt;">
        <span style="font-family: georgia, palatino;">
          <a class="ox-575dbea90e-mailto-link mailto-link" style="word-break: break-word; color: #3c73aa;" href="mailto:info@performcenterstage.com" target="_blank">info@performcenterstage.com</a>
          <br />(615)230-9341<br /><br />
          <img style="max-width: 100%; vertical-align: middle; height: auto;" src="https://jackrabbitstorage.blob.core.windows.net/prod/org_515936/orgfile/CS%20Logo%20Horizontal%20-%20small%20for%20signature_20170116155541.png" alt="CS Logo Horizontal - small for signature.png" /><br />
        </span>
      </span>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <a style="word-break: break-word; color: #3c73aa;" href="http://performcenterstage.com/" target="_blank" rel="noopener">performcenterstage.com</a>
    </p>
    <img border="0" width="1" height="1" alt="" src="http://click.jackrabbittech.com/q/AinMXnUhckLqvWDttzi7wQ~~/AAB6yhA~/F3U1If4qnh0jNKItZxXqHtbWQ0Xd5Q0j0WvE0sX_GQexo8Ubvdka-eJ1sJ6JLipkhXwAl80ZJepoNhX8deA8CQ~~">
  `;

  function handleApproveEmail() {
    fetch(
      "http://progress-reports-app.onrender.com/api/students/" + student.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_approved: true }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setStudent({ ...student, email_approved: true });
      });
  }

  function copyToClipboard() {
    const tempEmailBox = document.getElementById("email-box");
    if (tempEmailBox) {
      try {
        tempEmailBox.innerHTML =
          headerText +
          placementsText +
          suggestionsHeaderText +
          suggestionsText +
          centerText +
          reportsText +
          signatureText;
        const selection = window.getSelection();
        selection?.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(tempEmailBox);
        selection?.addRange(range);

        const successful = document.execCommand("copy");

        selection!.removeAllRanges();

        if (successful) {
          alert("Copied email contents to clipboard!");
        } else {
          alert("Failed to copy email contents to clipboard.");
        }
      } catch (error) {}
    }
  }

  if (student != undefined && student.first_name != undefined) {
    return (
      <>
        <Button variant="contained" onClick={handleApproveEmail}>
          Approve Email
        </Button>
        <Button variant="contained" color="secondary" onClick={copyToClipboard}>
          Copy Email Contents
        </Button>
        <Box
          id="email-box"
          sx={{
            borderRadius: "5px",
            border: "3px solid rgb(0, 0, 0)",
            padding: "5px",
          }}
          component="section"
          dangerouslySetInnerHTML={createMarkup(
            headerText +
              placementsText +
              suggestionsHeaderText +
              suggestionsText +
              centerText +
              reportsText +
              signatureText
          )}
        ></Box>
      </>
    );
  } else {
    return (
      <Box
        sx={{
          borderRadius: "5px",
          border: "3px solid rgb(0, 0, 0)",
          padding: "5px",
        }}
        component="section"
      ></Box>
    );
  }
}

export default RenderEmail;
