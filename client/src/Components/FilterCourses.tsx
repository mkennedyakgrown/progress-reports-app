import { FormControl, TextField } from "@mui/material";
import { useRef, useState } from "react";

function FilterCourses({ setCourseFilter }: any) {
  const [filterText, setFilterText] = useState("");
  const { current } = useRef({ filterText, timer: 0 });

  function handleChange(event: any) {
    setFilterText(event.target.value);

    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.timer = 0;
      setCourseFilter(event.target.value);
    }, 500);
  }

  return (
    <FormControl>
      <TextField
        id="outlined-basic"
        label="Search Your Classes"
        variant="outlined"
        value={filterText}
        onChange={handleChange}
      />
    </FormControl>
  );
}

export default FilterCourses;
