import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NextUIProvider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

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
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async ({
    amount,
    category,
    difficulty,
  }: {
    amount: string;
    category: string;
    difficulty: string;
  }) => {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount,
        category,
        difficulty,
      },
    });

    setQuestions(response?.data?.results || []);
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    const { amount, category, difficulty } = getValues();
    fetchQuestions({ amount, category, difficulty });
  };

  return (
    <NextUIProvider>
      <div className="flex items-center justify-center min-h-screen bg-slate-800">
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
      </div>
    </NextUIProvider>
  );
}

export default App;
