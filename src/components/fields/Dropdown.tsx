import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { FieldPropsInterface, OptionInterface } from "../../types";

const Dropdown = ({ id, answers, setInput, options }: FieldPropsInterface) => {
  const [dropdownValue, setDropdownValue] = useState<string>("" || answers[id]);
  const handleChange = (event: SelectChangeEvent<string>) => {
    setDropdownValue(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    if (answers[id]) setInput(answers[id]);
  }, []);

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={dropdownValue}
      onChange={handleChange}
    >
      {(options as OptionInterface[]).map((option, ix) => (
        <MenuItem key={ix + "" + option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Dropdown;
