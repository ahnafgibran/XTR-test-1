import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


export default function DropdownFilter() {
  const [filterBy, setFilterBy] = React.useState("favorite");

  const handleChange = (event) => {
    setFilterBy(event.target.value);
  };


  return (
    <div className='w-full px-4 mt-6'>
      <FormControl
        sx={{ width: "100%"}}
      >
        <Select
          value={filterBy}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"favorite"}>Filter by favorite</MenuItem>
          <MenuItem value={"name"}>Filter by name</MenuItem>
          <MenuItem value={"popularity"}>Filter by popularity</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
