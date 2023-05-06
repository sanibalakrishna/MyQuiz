import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Choice {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  choices: Choice[];
  correctChoiceId: string;
  userChoiceId?: string;
}
interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  timeRemaining: number;
  timeTaken: number;
}

function Quiz() {
  const question1: Question = {
    id: 1,
    text: "What is the capital of France?",
    choices: [
      { id: 1, text: "Paris" },
      { id: 2, text: "London" },
      { id: 3, text: "Berlin" },
      { id: 4, text: "Madrid" },
    ],
    correctChoiceId: "1",
  };

  const question2: Question = {
    id: 2,
    text: "What is the largest country by land area?",
    choices: [
      { id: 1, text: "Russia" },
      { id: 2, text: "China" },
      { id: 3, text: "Canada" },
      { id: 4, text: "United States" },
    ],
    correctChoiceId: "1",
  };
  const question3: Question = {
    id: 3,
    text: "What is the largest country by land area?",
    choices: [
      { id: 1, text: "Russia" },
      { id: 2, text: "China" },
      { id: 3, text: "Canada" },
      { id: 4, text: "United States" },
    ],
    correctChoiceId: "1",
  };
  const question4: Question = {
    id: 4,
    text: "What is the largest country by land area?",
    choices: [
      { id: 1, text: "Russia" },
      { id: 2, text: "China" },
      { id: 3, text: "Canada" },
      { id: 4, text: "United States" },
    ],
    correctChoiceId: "1",
  };
  const questions: Question[] = [question1, question2, question3, question4];
  const [report, setReport] = useState<number>(0);
  const [finish, setFinish] = useState<boolean>(false);
  const [lastindex, setLastindex] = useState<boolean>(false);
  const [quizstate, setQuizstate] = useState<QuizState>({
    questions,
    currentQuestionIndex: 0,
    timeRemaining: 60,
    timeTaken: 0,
  });
  const handleChoiceClick = (event: any) => {
    setSelectedOption(event.target.value);

    const updatedQuestions = quizstate.questions.map((q, index) => {
      if (index === quizstate.currentQuestionIndex) {
        return { ...q, userChoiceId: event.target.value };
      } else {
        return q;
      }
    });
    console.log(updatedQuestions);

    setQuizstate({
      ...quizstate,
      questions: updatedQuestions,
    });
  };
  const handleNextQuestionClick = () => {
    if (
      quizstate.questions[quizstate.currentQuestionIndex].correctChoiceId ==
      quizstate.questions[quizstate.currentQuestionIndex].userChoiceId
    ) {
      setReport((prevstate) => prevstate + 1);
    }
    if (lastindex) {
      setFinish(true);
      return;
    }
    const isLastQuestion =
      quizstate.currentQuestionIndex === quizstate.questions.length - 1;
    if (isLastQuestion) {
      setLastindex(true);
    }

    const nextQuestionIndex = isLastQuestion
      ? quizstate.currentQuestionIndex
      : quizstate.currentQuestionIndex + 1;
    const timeTaken = isLastQuestion
      ? quizstate.timeTaken + (60 - quizstate.timeRemaining)
      : quizstate.timeTaken;

    setQuizstate({
      ...quizstate,
      currentQuestionIndex: nextQuestionIndex,
      timeRemaining: 60,
      timeTaken,
    });
  };
  const handleTimerTick = () => {
    if (
      quizstate.questions.length - 1 == quizstate.currentQuestionIndex &&
      quizstate.timeRemaining === 0
    ) {
      setFinish(true);
    } else if (quizstate.timeRemaining === 0) {
      handleNextQuestionClick();
    } else {
      setQuizstate({
        ...quizstate,
        timeRemaining: quizstate.timeRemaining - 1,
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleTimerTick();
    }, 1000);
    return () => clearInterval(intervalId);
  });

  const [selectedOption, setSelectedOption] = useState("a");

  return (
    <div>
      <div className="flex justify-around ">
        <div className="px-4 py-1 bg-green-300 rounded-2xl flex items-center text-white">
          <p className="text-xs">
            {(quizstate.currentQuestionIndex + 1 < 10
              ? "0" + (quizstate.currentQuestionIndex + 1)
              : quizstate.currentQuestionIndex) +
              "/" +
              (quizstate.questions.length < 10
                ? "0" + quizstate.questions.length
                : quizstate.questions.length)}
          </p>
        </div>
        <div className="px-4 py-1 bg-[#b271cf] rounded-2xl flex items-center text-white">
          <p className="text-xs">
            {"0" +
              Math.floor(quizstate.timeRemaining / 60) +
              ":" +
              (quizstate.timeRemaining % 60 < 10
                ? "0" + (quizstate.timeRemaining % 60)
                : quizstate.timeRemaining % 60)}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between ">
        <p>{quizstate.questions[quizstate.currentQuestionIndex].text}</p>
        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-[80%] bg-white  drop-shadow-md flex justify-between px-5 py-2 rounded-md z-10">
            <div className="flex">
              <div className="border border-black w-5 text-center rounded-sm">
                A
              </div>
              <h1 className="ml-3">
                {
                  quizstate.questions[quizstate.currentQuestionIndex].choices[0]
                    .text
                }
              </h1>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="a"
                value="1"
                checked={selectedOption === "1"}
                onChange={handleChoiceClick}
              />
            </div>
          </div>
          <div className="w-[80%] bg-white  drop-shadow-md flex justify-between px-5 py-2 rounded-md z-10">
            <div className="flex">
              <div className="border border-black w-5 text-center rounded-sm">
                B
              </div>
              <h1 className="ml-3">
                {
                  quizstate.questions[quizstate.currentQuestionIndex].choices[1]
                    .text
                }
              </h1>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="b"
                value="2"
                checked={selectedOption === "2"}
                onChange={handleChoiceClick}
              />
            </div>
          </div>{" "}
          <div className="w-[80%] bg-white  drop-shadow-md flex justify-between px-5 py-2 rounded-md z-10">
            <div className="flex">
              <div className="border border-black w-5 text-center rounded-sm">
                C
              </div>
              <h1 className="ml-3">
                {
                  quizstate.questions[quizstate.currentQuestionIndex].choices[2]
                    .text
                }
              </h1>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="c"
                value="3"
                checked={selectedOption === "3"}
                onChange={handleChoiceClick}
              />
            </div>
          </div>{" "}
          <div className="w-[80%] bg-white  drop-shadow-md flex justify-between px-5 py-2 rounded-md z-10">
            <div className="flex">
              <div className="border border-black w-5 text-center rounded-sm">
                D
              </div>
              <h1 className="ml-3">
                {
                  quizstate.questions[quizstate.currentQuestionIndex].choices[3]
                    .text
                }
              </h1>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="d"
                value="4"
                checked={selectedOption === "4"}
                onChange={handleChoiceClick}
              />
            </div>
          </div>
          <button
            className="px-4 py-1 rounded-lg bg-[#9057a0] text-white active:scale-95"
            onClick={handleNextQuestionClick}
          >
            {quizstate.currentQuestionIndex == quizstate.questions.length - 1
              ? "Finish"
              : "Next"}
          </button>
          {finish && (
            <Navigate
              to={`/result?report=${report}&total=${quizstate.questions.length}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
