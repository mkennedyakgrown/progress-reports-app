import { useEffect, useRef, useState } from "react";
import ReportsInstructor from "../Components/ReportsInstructor";
import SelectInstructor from "../Components/SelectInstructor";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

function Reports() {
  const [instructors, setInstructors] = useState([
    {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      courses: [],
    },
  ]);
  const [currentInstructor, setCurrentInstructor] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    courses: [],
  });
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
      console.log(`Fetching User ${params.userId}`);
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
  }, []);

  function handleSelectInstructor(event) {
    console.log(event.target.value);
    setSelectedInstructor(event.target.value);
  }

  function handleNavigateClick() {
    console.log(`Navigating to /reports/users/${selectedInstructor}`);
    navigate(`/reports/users/${selectedInstructor}`);
  }

  return (
    <>
      <h1>Reports</h1>
      <SelectInstructor
        instructors={instructors}
        handleSelectInstructor={handleSelectInstructor}
        selectedInstructor={selectedInstructor}
      />
      <Button variant="contained" onClick={handleNavigateClick}>
        Go to Instructor
      </Button>
      {courses.length > 0 ? (
        <ReportsInstructor {...{ courses }} />
      ) : params.userId ? (
        <>
          <h2>Retrieving Classes and Preparing Reports...</h2>
          <CircularProgress />
        </>
      ) : null}
    </>
  );
}

export default Reports;
