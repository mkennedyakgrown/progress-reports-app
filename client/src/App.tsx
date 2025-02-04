// import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <header className="App-header">
        <h1>Progress Reports App</h1>
      </header>
      <Outlet />
    </>
  );
}

export default App;
