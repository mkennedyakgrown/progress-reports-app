import EditOnePlacement from "./EditOnePlacement";

function EditPlacements({ student, setStudent }: any) {
  const placementTextBoxes = student.placements
    ? student.placements.map((placement: any) => {
        return (
          <EditOnePlacement
            key={placement.id}
            {...{ placement, student, setStudent }}
          />
        );
      })
    : null;

  return (
    <>
      <h2>Edit Placements</h2>
      {placementTextBoxes}
      <EditOnePlacement
        {...{
          placement: {
            course_name: "",
            id: -1,
            student: {
              first_name: student.first_name,
              last_name: student.last_name,
            },
            student_id: student.id,
          },
          student,
          setStudent,
        }}
      />
    </>
  );
}

export default EditPlacements;
