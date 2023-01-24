import { useEffect, useState } from "react";
import { FieldPropsInterface } from "../../types";

const Text = ({ id, answers, setInput }: FieldPropsInterface) => {
  const [textValue, setTextValue] = useState<string>("" || answers[id]);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    if (answers[id]) setInput(answers[id]);
  }, []);

  return (
    <textarea onChange={handleChange} rows={4} cols={50}>
      {textValue}
    </textarea>
  );
};

export default Text;
