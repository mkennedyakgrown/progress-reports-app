// import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";

function App() {
  const [sessionUser, setSessionUser] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    courses: [],
  });

  useEffect(() => {
    console.log("Loading User");
    fetch("https://progress-reports-app.onrender.com/api/check-session")
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          setSessionUser(data);
        }
      });
  }, []);

  useEffect(() => {
    console.log("Testing Fetch");
    fetch("https://cat-fact.herokuapp.com/facts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <>
      <header className="App-header">
        <NavBar {...{ sessionUser, setSessionUser }} />
      </header>
      <Outlet context={{ sessionUser, setSessionUser }} />
    </>
  );
}

export default App;
