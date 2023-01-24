import Checkbox from "../components/fields/Checkbox";
import Radio from "../components/fields/Radio";
import Dropdown from "../components/fields/Dropdown";
import Text from "../components/fields/Text";
import { CardPropsInterface } from "../types";

const Card = ({ data, answers, setInput, children }: CardPropsInterface) => {
  return (
    <div className="center">
      <div className="card">
        {children}
        <div className="card-wrapper center">
          <p className="question">{data.question}</p>
          {data.type === "radio" ? (
            <Radio
              id={data.id}
              answers={answers}
              setInput={setInput}
              options={data.options}
            />
          ) : data.type === "dropdown" ? (
            <Dropdown
              id={data.id}
              answers={answers}
              setInput={setInput}
              options={data.options}
            />
          ) : data.type === "checkbox" ? (
            <Checkbox
              id={data.id}
              answers={answers}
              setInput={setInput}
              options={data.options}
            />
          ) : (
            <Text id={data.id} answers={answers} setInput={setInput} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
