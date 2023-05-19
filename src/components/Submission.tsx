import { SubmissionPropsInterface } from "../types";

const Submission = ({ data, answers }: SubmissionPropsInterface) => {
  return (
    <div className="center">
      <div className="card">
        <div className="card-wrapper">
          <p className="center question">Thanks for Submitting</p>
          {data.map((value, ix) => (
            <div key={ix+""+value.id} className="m-10">
              <p className="m-0">
                Q{ix + 1}. {value.question}
              </p>
              <p className="m-0 white">Ans: {answers[value.id]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Submission;
