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
  const [currentInstructorId, setCurrentInstructorId] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/users")
      .then((response) => response.json())
      .then((instructorsData) => {
        console.log(instructorsData);
        setInstructors(instructorsData);
      });

    if (params.userId) {
      setCurrentInstructorId(params.userId);
      setSelectedInstructor(params.userId.toString());
    }
  }, []);

  function handleSelectInstructor(event) {
    console.log(event.target.value);
    setSelectedInstructor(event.target.value);
    console.log(`Navigating to /reports/users/${event.target.value}`);
    navigate(`/reports/users/${event.target.value}`);
  }

  return (
    <>
      <h1>Reports</h1>
      <SelectInstructor
        instructors={instructors}
        handleSelectInstructor={handleSelectInstructor}
        selectedInstructor={selectedInstructor}
      />
      <ReportsInstructor {...{ currentInstructorId: params.userId }} />
    </>
  );
}

export default Reports;
