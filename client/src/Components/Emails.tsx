import { useEffect, useState } from "react";
import RenderEmail from "./RenderEmail";
import EditPlacements from "./Email-Edit-Components/EditPlacements";
import EditSuggestions from "./Email-Edit-Components/EditSuggestions";
import EditReports from "./Email-Edit-Components/EditReports";

function Emails({ selectedStudent }: any) {
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/api/students/email/${selectedStudent}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
      });
  }, [selectedStudent]);

  console.log(student);
  return (
    <>
      <h2>Emails</h2>
      <RenderEmail {...{ student, setStudent }} />
      <EditPlacements {...{ student, setStudent }} />
      <EditSuggestions {...{ student, setStudent }} />
      <EditReports {...{ student, setStudent }} />
    </>
  );
}

export default Emails;
