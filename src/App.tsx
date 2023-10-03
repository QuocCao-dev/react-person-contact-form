import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NextUIProvider,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { shuffle } from "lodash";
import { Question } from "./types/question";

/**
 *
 *  https://opentdb.com/api.php?amount=5
 *  Endpoint : https://opentdb.com/api.php
 *  Query Params: ?amount=5
 *
 * https://opentdb.com/api.php?amount=10&category=21
 * Endpoint : https://opentdb.com/api.php
 * Query Params: ?amount=10&category=21 => amount = 10 , category = 21 (Sport) - 23 (History) - 24 (Politics)
 * Query Params: ?amount=10&category=21&difficulty=easy => amount = 10 , category = 21 (Sport) - 23 (History) - 24 (Politics) , difficulty = easy|medium|hard
 */

const CATEGORIES = [
  {
    label: "Sports",
    value: "21",
  },
  {
    label: "History",
    value: "23",
  },
  {
    label: "Politics",
    value: "24",
  },
];

const DIFFICULTIES = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];

const DEFAULT_CATEGORY = CATEGORIES[0].value;
const DEFAULT_DIFFICULTY = DIFFICULTIES[0].value;

function App() {
  const form = useForm({
    defaultValues: {
      amount: "10",
      category: DEFAULT_CATEGORY,
      difficulty: DEFAULT_DIFFICULTY,
    },
  });
  const { register, getValues } = form;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [step, setStep] = useState<"config" | "do-test">("config");

  const currentQuestion = questions[currentIdx];

  const fetchQuestions = async ({
    amount,
    category,
    difficulty,
  }: {
    amount: string;
    category: string;
    difficulty: string;
  }) => {
    setLoading(true);
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount,
        category,
        difficulty,
      },
    });

    const formatQuestions = response?.data?.results?.map((question: any) => ({
      ...question,
      questions: shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));

    setQuestions(formatQuestions);
    setLoading(false);
    setStep("do-test");
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    const { amount, category, difficulty } = getValues();
    fetchQuestions({ amount, category, difficulty });
  };

  const handleNextQuestion = () => {
    setCurrentIdx((prev) => prev + 1);
  };

  const handleAnswerQuestion = (question: string) => {
    const isCorrect = question === currentQuestion.correct_answer;
    if (isCorrect) {
      alert("Correct answer");
    } else {
      alert("Wrong answer");
    }

    setCurrentIdx((prev) => prev + 1);
  };

  return (
    <NextUIProvider>
      <div className="flex items-center justify-center min-h-screen bg-slate-800">
        {loading ? (
          <Spinner color="warning" label="Loading..." />
        ) : (
          <>
            {/* Config question */}
            {step === "config" && (
              <Card className="w-[500px]">
                <CardHeader>Setup Quiz</CardHeader>

                <CardBody>
                  <form className="space-y-4" onSubmit={handleSubmitForm}>
                    <Input
                      label="Number Of Questions"
                      size="sm"
                      {...register("amount")}
                    />
                    <Select
                      label="Category"
                      {...register("category")}
                      defaultSelectedKeys={[DEFAULT_CATEGORY]}
                    >
                      {CATEGORIES.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="difficulty"
                      {...register("difficulty")}
                      defaultSelectedKeys={[DEFAULT_DIFFICULTY]}
                    >
                      {DIFFICULTIES.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </form>
                </CardBody>
              </Card>
            )}
            {/* load questions */}
            {step === "do-test" && (
              <div>
                <div className="text-white">{currentQuestion?.question}</div>
                {currentQuestion?.questions.map((question) => (
                  <Card>
                    <CardBody onClick={() => handleAnswerQuestion(question)}>
                      <p>{question}</p>
                    </CardBody>
                  </Card>
                ))}
                <Button onClick={handleNextQuestion}>Next Question</Button>
              </div>
            )}
          </>
        )}
      </div>
    </NextUIProvider>
  );
}

export default App;
