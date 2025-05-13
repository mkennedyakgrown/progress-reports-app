import EditOneReport from "./EditOneReport";

function EditReports({ student, setStudent }: any) {
  const reportTextBoxes = student.student_reports
    ? student.student_reports
        .filter((report: any) => report.report_text != " ")
        .map((report: any) => {
          return (
            <EditOneReport
              key={report.id}
              {...{ report, student, setStudent }}
            />
          );
        })
    : null;

  return (
    <>
      <h2>Edit Reports</h2>
      {reportTextBoxes}
    </>
  );
}

export default EditReports;
