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
    </>
  );
}

export default EditSuggestions;
