import { useEffect, useState } from "react";
import ReportsClass from "../Components/ReportsClass";

function Reports() {
  const [courses, setCourses] = useState([
    {
      id: 0,
      department: "",
      level: "",
      students: [],
    },
  ]);
  const [students, setStudents] = useState([
    {
      id: 0,
      name: "",
      email: "",
    },
  ]);
  const [reports, setReports] = useState([
    {
      id: 0,
      course_id: 0,
      student_id: 0,
      report: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/reports")
      .then((response) => response.json())
      .then((reportsData) => setReports(reportsData));
    fetch("http://localhost:3000/courses")
      .then((response) => response.json())
      .then((coursesData) => setCourses(coursesData));
    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((studentsData) => setStudents(studentsData));
  }, []);

  function handleUpdateReport({ report_id, report_text }) {
    const updatedReports = reports.map((report) => {
      if (report.id === report_id) {
        report.report_text = report_text;
      }
      return report;
    });
    setReports(updatedReports);
  }

  return (
    <>
      <h1>Reports</h1>
      {/* Add a button to confirm "I have completed all of my reports!" */}
      <ReportsClass {...{ courses, students, reports, handleUpdateReport }} />
    </>
  );
}

export default Reports;
