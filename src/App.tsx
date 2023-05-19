import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Card from "./components/Card";
import { AnswersInterface, DataInterface } from "./types";
import Submission from "./components/Submission";
import ErrorBanner from "./components/Error";

enum Increment {
  NEXT = 1,
  BACK = -1,
}

function App() {
  const [question, setQuestion] = useState(1);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState<AnswersInterface>({});
  const [error, showError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submission, setSubmission] = useState(false);
  
  const [data, totalQuestions] = useFetch("http://localhost:8080/",setErrorMessage,showError);

  useEffect(() => {
    let tmpObj: AnswersInterface = {};
    data.forEach((value) => (tmpObj[value.id] = ""));
    setAnswers(tmpObj);
  }, [data]);

  useEffect(() => {
    if (totalQuestions) setProgress((question / totalQuestions) * 100);
  }, [question, totalQuestions]);

  const handleQuestion = (increment: Increment) => {
    if (!data[question - 1].optional && !input.trim()) {
      setErrorMessage("This question is mandatory! Please respond.");
      showError(true);
    } else {
      setAnswers((prev) => ({ ...prev, [data[question - 1].id]: input }));
      setInput("");
      showError(false);
      if (question === totalQuestions && increment === Increment.NEXT) {
        setSubmission(true);
      } else if (
        (increment === Increment.NEXT && question < totalQuestions) ||
        (increment === Increment.BACK && question > 1)
      )
        setQuestion((q) => q + increment);
    }
  };

  return (
    <div className="App">
      <LinearProgress variant={"determinate"} value={progress} />
      {error && <ErrorBanner message={errorMessage} onClick={()=>showError(false)} />}
      {submission ? (
        <Submission data={data} answers={answers} />
      ) : (
        data.length && (
          <div>
            <Card
              data={data[question - 1]}
              answers={answers}
              setInput={setInput}
            >
              <p className="question-number">
                {question}/{totalQuestions}
              </p>
            </Card>
            <div className="center">
              <Button
                variant="outlined"
                disabled={question === 1}
                onClick={() => handleQuestion(Increment.BACK)}
              >
                ← BACK
              </Button>
              <Button
                variant={question === totalQuestions ? "contained" : "outlined"}
                onClick={() => handleQuestion(Increment.NEXT)}
              >
                {question === totalQuestions ? "SUBMIT" : "NEXT →"}
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
