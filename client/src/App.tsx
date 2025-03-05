import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedInfo = sessionStorage.getItem("isLoggedIn");
    if (storedInfo == "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // const [sessionUser, setSessionUser] = useState({
  //   id: 0,
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   courses: [],
  // });

  // useEffect(() => {
  //   console.log("Loading User");
  //   fetch("https://progress-reports-app.onrender.com/api/check-session")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.email) {
  //         setSessionUser(data);
  //       }
  //     });
  // }, []);

  return (
    <>
      <header className="App-header">
        {/* <NavBar {...{ sessionUser, setSessionUser }} /> */}
        <NavBar />
      </header>
      {/* <Outlet context={{ sessionUser, setSessionUser }} /> */}
      <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
    </>
  );
}

export default App;
