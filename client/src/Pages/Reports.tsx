import { useEffect, useState } from "react";
import ReportsInstructor from "../Components/ReportsInstructor";
import SelectInstructor from "../Components/SelectInstructor";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

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
  const { sessionUser } = useOutletContext();

  useEffect(() => {
    console.log(sessionUser);
    if (sessionUser.id == 0) {
      navigate("/login", { replace: true });
    }
  }, []);

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
      setCurrentInstructorId(params.userId);
      setSelectedInstructor(params.userId.toString());
    }
  }, [params]);

  function handleSelectInstructor(event) {
    console.log(event.target.value);
    setSelectedInstructor(event.target.value);
    console.log(`Navigating to /reports/users/${event.target.value}`);
    navigate(`/reports/users/${event.target.value}`);
  }

  return (
    <>
      <h1>{`${sessionUser.first_name} ${sessionUser.last_name}'s Progress Reports`}</h1>
      {sessionUser.is_admin ? (
        <SelectInstructor
          instructors={instructors}
          handleSelectInstructor={handleSelectInstructor}
          selectedInstructor={selectedInstructor}
        />
      ) : null}
      <ReportsInstructor {...{ currentInstructorId }} />
    </>
  );
}

export default Reports;
