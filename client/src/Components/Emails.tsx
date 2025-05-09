import { useEffect, useState } from "react";
import RenderEmail from "./RenderEmail";
import ReportsStudent from "./ReportsStudent";

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
      <RenderEmail {...{ student }} />
      <ReportsStudent {...{ student, setStudent }} />
    </>
  );
}

export default Emails;
