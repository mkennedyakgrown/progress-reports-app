import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectInstructor({
  instructors,
  handleSelectInstructor,
  selectedInstructor,
}: any) {
  const instructorsList =
    instructors.length > 0
      ? instructors.map((instructor: any) => {
          return (
            <MenuItem
              key={`instructor-select-${instructor.id}`}
              id={`instructor-select-${instructor.id}`}
              value={instructor.id}
            >
              {`${instructor.first_name} ${instructor.last_name}`}
            </MenuItem>
          );
        })
      : [];
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="select-instructor-label">Select Instructor</InputLabel>
      <Select
        labelId="select-instructor-label"
        id="select-instructor"
        value={selectedInstructor}
        label="Select Instructor"
        autoWidth
        onChange={handleSelectInstructor}
      >
        {instructorsList}
      </Select>
    </FormControl>
  );
}

export default SelectInstructor;
