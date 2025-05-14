import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function EditOneSuggestion({ suggestion, student, setStudent }: any) {
  const [suggestionText, setSuggestionText] = useState(
    suggestion.course_name || ""
  );

  useEffect(() => {
    setSuggestionText(suggestion.course_name);
  }, [suggestion]);

  function handleSave(suggestion: any) {
    if (suggestion.id !== -1) {
      fetch(
        `https://progress-reports-app.onrender.com/api/suggestions/${suggestion.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_name: suggestionText,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const suggestions = student.suggestions.map((p: any) => {
            if (p.id === data.id) {
              return data;
            } else {
              return p;
            }
          });
          setStudent({ ...student, suggestions: suggestions });
        });
    } else {
      fetch(`https://progress-reports-app.onrender.com/api/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_name: suggestionText,
          student_id: student.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setStudent({
            ...student,
            suggestions: [...student.suggestions, data],
          });
        });
    }
  }

  function handleCancel() {
    setSuggestionText(suggestion.course_name);
  }

  function onTextChange(newText: string) {
    setSuggestionText(newText);
  }

  function handleDelete() {
    fetch(
      `https://progress-reports-app.onrender.com/api/suggestions/${suggestion.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        const suggestions = student.suggestions.filter(
          (p: any) => p.id !== suggestion.id
        );
        setStudent({ ...student, suggestions: suggestions });
      });
  }

  return (
    <Box key={suggestion.id}>
      <TextField
        id="report-text"
        placeholder={"Add a new suggestion"}
        sx={{ width: "50%" }}
        value={suggestionText}
        onChange={(event) => onTextChange(event.target.value)}
      />
      <Button variant="contained" onClick={() => handleSave(suggestion)}>
        Save
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
}

export default EditOneSuggestion;
