import { useEffect, useRef, useState } from "react";
import ReportsInstructor from "../Components/ReportsInstructor";
import SelectInstructor from "../Components/SelectInstructor";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Button, CircularProgress, LinearProgress } from "@mui/material";

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
  const [saveIsActive, setSaveIsActive] = useState(false);
  const { current } = useRef({ timer: 0 });
  const [currentInstructorId, setCurrentInstructorId] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext<any>();
  // const { sessionUser } = useOutletContext<any>();

  // useEffect(() => {
  //   console.log(sessionUser);
  //   if (sessionUser.id == 0) {
  //     navigate("/login", { replace: true });
  //   }
  // }, []);

  useEffect(() => {
    if (isLoggedIn != true) {
      navigate("/login", { replace: true });
    }
  });

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

  function handleSaveClick() {
    setSaveIsActive(true);
    current.timer = setTimeout(() => {
      current.timer = 0;
      setSaveIsActive(false);
    }, 5000);
  }

  return (
    <>
      {/* <h2>{`Welcome, ${sessionUser.first_name} ${sessionUser.last_name}!`}</h2> */}
      <h2>
        Welcome, CS Instructor! Select your name from the dropdown menu below.
      </h2>
      {instructors.length > 1 ? (
        <>
          <SelectInstructor
            instructors={instructors}
            handleSelectInstructor={handleSelectInstructor}
            selectedInstructor={selectedInstructor}
          />
          {saveIsActive ? (
            <div>
              <p>Saving...</p>
              <CircularProgress />
            </div>
          ) : (
            <Button variant="contained" onClick={handleSaveClick}>
              Save
            </Button>
          )}
        </>
      ) : (
        <div>
          <h3>Retrieving Instructors...</h3>
          <LinearProgress color="success" />
        </div>
      )}
      <ReportsInstructor {...{ currentInstructorId }} />
    </>
  );
}

export default Reports;
