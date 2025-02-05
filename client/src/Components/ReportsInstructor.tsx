import ReportsClass from "./ReportsClass";

function ReportsInstructor({ currentInstructor, instructorCourses = [] }) {
  function handleUpdateRequest(
    currentReportText: String,
    report,
    reportType: { String: "student" | "course" }
  ) {
    console.log(`Updating ${reportType} report...`, report.id);

    fetch(`http://localhost:5555/${reportType}-reports/${report.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report_text: currentReportText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Report ${report.id} successfully saved`);
      })
      .catch((error) => console.error("Error patching report:", error));
  }

  return (
    <>
      {instructorCourses.length > 0
        ? instructorCourses.map((course) => {
            return (
              <ReportsClass
                key={`course${course.id}`}
                {...{
                  currentInstructor,
                  course,
                  handleUpdateRequest,
                }}
              />
            );
          })
        : null}
    </>
  );
}

export default ReportsInstructor;
