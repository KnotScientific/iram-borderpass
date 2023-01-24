import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Card from "./components/Card";
import { AnswersInterface, DataInterface } from "./types";
import Submission from "./components/Submission";

enum Increment {
  NEXT = 1,
  BACK = -1,
}

function App() {
  const [question, setQuestion] = useState(1);
  // const [data, totalQuestions] = useFetch("localhost:8080/");
  const [input, setInput] = useState("");
  const [data, setData] = useState<DataInterface[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState<AnswersInterface>({});
  const [error, showError] = useState(false);
  const [submission, setSubmission] = useState(false);

  useEffect(() => {
    let tmpObj: AnswersInterface = {};
    data.forEach((value) => (tmpObj[value.id] = ""));
    setAnswers(tmpObj);
  }, [data]);

  useEffect(() => {
    setData([
      {
        id: 3450,
        question: "What is thy?",
        type: "checkbox",
        optional: true,
        options: [
          {
            label: "a",
            value: "a",
          },
          {
            label: "b",
            value: "b",
          },
        ],
      },
      {
        id: 3250,
        question: "How is thy?",
        type: "text",
        optional: false,
      },
      {
        id: 3460,
        question: "Where is thy?",
        type: "dropdown",
        optional: true,
        options: [
          {
            label: "a",
            value: "a",
          },
          {
            label: "b",
            value: "b",
          },
        ],
      },
      {
        id: 30,
        question: "When is thy?",
        type: "radio",
        optional: true,
        options: [
          {
            label: "a",
            value: "a",
          },
          {
            label: "b",
            value: "b",
          },
        ],
      },
    ]);
    setTotalQuestions(4);
  }, []);

  useEffect(() => {
    if (totalQuestions) setProgress((question / totalQuestions) * 100);
  }, [question, totalQuestions]);

  const handleQuestion = (increment: Increment) => {
    if (!data[question - 1].optional && !input.trim()) {
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
      {error && (
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                showError(false);
              }}
            >
              X
            </IconButton>
          }
        >
          This question is mandatory! Please respond.
        </Alert>
      )}
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
