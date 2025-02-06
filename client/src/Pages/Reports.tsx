import { useEffect, useState } from "react";
import ReportsInstructor from "../Components/ReportsInstructor";
import SelectInstructor from "../Components/SelectInstructor";
import { useNavigate, useParams } from "react-router-dom";

function Reports() {
  const [instructors, setInstructors] = useState([
    {
      id: 0,
      name: "",
      email: "",
      courses: [],
    },
  ]);
  const [currentInstructor, setCurrentInstructor] = useState({});
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [courses, setCourses] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/users")
      .then((response) => response.json())
      .then((instructorsData) => {
        console.log(instructorsData);
        setInstructors(instructorsData);
      });
  }, []);

  useEffect(() => {
    if (params.userId) {
      setSelectedInstructor(params.userId.toString());
      fetch(`http://localhost:5555/users/${params.userId}/courses`)
        .then((response) => response.json())
        .then((coursesData) => {
          console.log(coursesData);
          setCourses(coursesData);
        })
        .catch((error) =>
          console.error(`Error fetching instructor id ${params.userId}:`, error)
        );
    }
  }, []);

  useEffect(() => {
    if (params.userId) {
      setCurrentInstructor(
        instructors.find((user) => user.id == params.userId)
      );
    }
  }, [instructors]);

  function handleSelectInstructor(event) {
    navigate(`/reports/users/${event.target.value}`);
  }

  return (
    <>
      <h1>Reports</h1>
      {/* Add a button to confirm "I have completed all of my reports!" */}
      <SelectInstructor
        instructors={instructors}
        handleSelectInstructor={handleSelectInstructor}
        selectedInstructor={selectedInstructor}
      />
      {courses.length > 0 ? <ReportsInstructor {...{ courses }} /> : null}
    </>
  );
}

export default Reports;
