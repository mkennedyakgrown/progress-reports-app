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
    </>
  );
}

export default EditPlacements;
