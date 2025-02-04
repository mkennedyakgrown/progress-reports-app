import { useEffect, useState } from "react";
import ReportsInstructor from "../Components/ReportsInstructor";
import SelectInstructor from "../Components/SelectInstructor";

function Reports() {
  const [instructors, setInstructors] = useState([
    {
      id: 0,
      name: "",
      email: "",
      courses: [],
    },
  ]);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/users")
      .then((response) => response.json())
      .then((instructorsData) => {
        console.log(instructorsData);
        setInstructors(instructorsData);
      });
  }, []);

  useEffect(() => {
    if (selectedInstructorId != "") {
      fetch(`http://localhost:5555/users/${selectedInstructorId}/courses`)
        .then((response) => response.json())
        .then((coursesData) => setInstructorCourses(coursesData))
        .catch((error) =>
          console.error(
            `Error fetching instructor id ${selectedInstructorId}:`,
            error
          )
        );
    }
  }, [selectedInstructorId]);

  function handleSelectInstructor(event) {
    setSelectedInstructorId(event.target.value);
  }

  const currentInstructor = instructors.find(
    (instructor) => instructor.id == parseInt(selectedInstructorId)
  );

  return (
    <>
      <h1>Reports</h1>
      {/* Add a button to confirm "I have completed all of my reports!" */}
      <SelectInstructor
        instructors={instructors}
        handleSelectInstructor={handleSelectInstructor}
        selectedInstructor={selectedInstructorId}
      />
      <ReportsInstructor {...{ currentInstructor, instructorCourses }} />
    </>
  );
}

export default Reports;
