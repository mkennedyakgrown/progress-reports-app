import EditOneSuggestion from "./EditOneSuggestion";

function EditSuggestions({ student, setStudent }: any) {
  const suggestionTextBoxes = student.placements
    ? student.suggestions.map((suggestion: any) => {
        return (
          <EditOneSuggestion
            key={suggestion.id}
            {...{ suggestion, student, setStudent }}
          />
        );
      })
    : null;

  return (
    <>
      <h2>Edit Suggestions</h2>
      {suggestionTextBoxes}
      <EditOneSuggestion
        {...{
          suggestion: {
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

export default EditSuggestions;
