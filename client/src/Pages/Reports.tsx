import { useEffect, useState } from "react";
import ReportsInstructor from "../Components/ReportsInstructor";
import SelectInstructor from "../Components/SelectInstructor";
import { useNavigate, useParams } from "react-router-dom";

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
  // const { sessionUser } = useOutletContext<any>();

  // useEffect(() => {
  //   console.log(sessionUser);
  //   if (sessionUser.id == 0) {
  //     navigate("/login", { replace: true });
  //   }
  // }, []);

  useEffect(() => {
    fetch("https://progress-reports-app.onrender.com/api/users")
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

  function handleSelectInstructor(event: any) {
    console.log(event.target.value);
    setSelectedInstructor(event.target.value);
    console.log(`Navigating to /reports/users/${event.target.value}`);
    navigate(`/reports/users/${event.target.value}`);
  }

  return (
    <>
      {/* <h2>{`Welcome, ${sessionUser.first_name} ${sessionUser.last_name}!`}</h2> */}
      <h2>
        Welcome, CS Instructors! Select your name from the dropdown menu below.
      </h2>
      <SelectInstructor
        instructors={instructors}
        handleSelectInstructor={handleSelectInstructor}
        selectedInstructor={selectedInstructor}
      />
      <ReportsInstructor {...{ currentInstructorId }} />
    </>
  );
}

export default Reports;
