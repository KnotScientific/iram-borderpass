import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FieldPropsInterface, OptionInterface } from "../../types";
import { useEffect, useState } from "react";

const RadioInput = ({
  id,
  answers,
  setInput,
  options,
}: FieldPropsInterface) => {
  const [radioValue, setRadioValue] = useState<string>("" || answers[id]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    if (answers[id]) setInput(answers[id]);
  }, []);

  return (
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={radioValue}
      onChange={handleChange}
    >
      {(options as OptionInterface[]).map((option, ix) => (
        <FormControlLabel
          key={ix + "" + option.label}
          value={option.value}
          control={
            <Radio
              sx={{
                color: "pink",
                "&.Mui-checked": {
                  color: "red",
                },
              }}
            />
          }
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioInput;
