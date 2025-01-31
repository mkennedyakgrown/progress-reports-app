import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectInstructor({
  instructors,
  handleSelectInstructor,
  selectedInstructor,
}) {
  const instructorsList = instructors.map((instructor) => {
    return (
      <MenuItem id={`instructor-select-${instructor.id}`} value={instructor.id}>
        {instructor.name}
      </MenuItem>
    );
  });
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} fullWidth>
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
