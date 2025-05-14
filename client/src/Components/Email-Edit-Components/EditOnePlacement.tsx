import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function EditOnePlacement({ placement, student, setStudent }: any) {
  const [placementText, setPlacementText] = useState(
    placement.course_name || ""
  );

  useEffect(() => {
    setPlacementText(placement.course_name);
  }, [placement]);

  function handleSave(placement: any) {
    if (placement.id !== -1) {
      fetch(
        `https://progress-reports-app.onrender.com/api/placements/${placement.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_name: placementText,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const placements = student.placements.map((p: any) => {
            if (p.id === data.id) {
              return data;
            } else {
              return p;
            }
          });
          setStudent({ ...student, placements: placements });
        });
    } else {
      fetch(`https://progress-reports-app.onrender.com/api/placements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_name: placementText,
          student_id: student.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setStudent({ ...student, placements: [...student.placements, data] });
        });
    }
  }

  function handleCancel() {
    setPlacementText(placement.course_name);
  }

  function onTextChange(newText: string) {
    setPlacementText(newText);
  }

  function handleDelete() {
    fetch(
      `https://progress-reports-app.onrender.com/api/placements/${placement.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        const placements = student.placements.filter(
          (p: any) => p.id !== placement.id
        );
        setStudent({ ...student, placements: placements });
      });
  }

  return (
    <Box key={placement.id}>
      <TextField
        id="report-text"
        placeholder={"Add a new placement"}
        sx={{ width: "50%" }}
        value={placementText}
        onChange={(event) => onTextChange(event.target.value)}
      />
      <Button variant="contained" onClick={() => handleSave(placement)}>
        Save
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
}

export default EditOnePlacement;
