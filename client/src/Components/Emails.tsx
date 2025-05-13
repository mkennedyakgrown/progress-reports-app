import { useEffect, useState } from "react";
import RenderEmail from "./RenderEmail";
import EditPlacements from "./Email-Edit-Components/EditPlacements";
import EditSuggestions from "./Email-Edit-Components/EditSuggestions";
import EditReports from "./Email-Edit-Components/EditReports";

function Emails({ selectedStudent }: any) {
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetch(
      `http://progress-reports-app.onrender.com/api/students/email/${selectedStudent}`
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
      <RenderEmail {...{ student, setStudent }} />
      <EditPlacements {...{ student, setStudent }} />
      <EditSuggestions {...{ student, setStudent }} />
      <EditReports {...{ student, setStudent }} />
    </>
  );
}

export default Emails;
