import { useEffect, useState } from "react";
import RenderReportsEmail from "./RenderReportsEmail";
import EditReports from "./Email-Edit-Components/EditReports";

function ReportEmails({ selectedStudent }: any) {
  const [student, setStudent] = useState({ first_name: "", last_name: "" });

  useEffect(() => {
    fetch(
      `https://progress-reports-app.onrender.com/api/students/email/${selectedStudent}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
      });
  }, [selectedStudent]);

  const studentName = student.first_name
    ? student.first_name + " " + student.last_name
    : "";

  console.log(student);
  return (
    <>
      <h2>{studentName}'s Emails</h2>
      <RenderReportsEmail {...{ student, setStudent }} />
      <EditReports {...{ student, setStudent }} />
    </>
  );
}

export default ReportEmails;
