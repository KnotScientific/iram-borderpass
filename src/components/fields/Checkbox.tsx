import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import { FieldPropsInterface, OptionInterface } from "../../types";

const Check = ({ id, answers, setInput, options }: FieldPropsInterface) => {
  const [items, setItems] = useState<
    (OptionInterface & { checked: boolean })[]
  >([]);

  const handleChange = (index: number) => {
    let tmpItems = items.map((item, ix) => ({
      ...item,
      checked: ix === index ? !item.checked : item.checked,
    }));
    setItems(tmpItems);
    setInput(
      tmpItems
        .filter((v) => v.checked)
        .map((v) => v.value)
        .join()
    );
  };

  useEffect(() => {
    let savedData: string[] = [];
    if (answers[id]) {
      savedData = answers[id].split(",");
    }
    setItems(
      (options as OptionInterface[]).map((option) => ({
        ...option,
        checked: !!savedData.includes(option.value),
      }))
    );
  }, [options]);

  useEffect(() => {
    if (answers[id]) setInput(answers[id]);
  }, []);

  return (
    <>
      {items.map((option, ix) => (
        <FormControlLabel
          key={ix + "" + option.label}
          control={
            <Checkbox
              sx={{
                color: "pink",
                "&.Mui-checked": {
                  color: "red",
                },
              }}
              checked={option.checked}
              onChange={() => handleChange(ix)}
            />
          }
          label={option.label || option.value}
        />
      ))}
    </>
  );
};

export default Check;
