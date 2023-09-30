import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NextUIProvider,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { useForm } from "react-hook-form"; // 1. Import the useForm hook
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * react-hook-form: Quản lí form
 * zod: validation
 * @hookform/resolvers : kết hợp với zod để validate
 */

// z.dataType.validator
const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().nonempty("Name can not be empty"),
  age: z.string().nonempty("Age can not be empty"),
  gender: z.string().nonempty("Gender can not be empty"),
  district: z.string().nonempty("District can not be empty"),
});

const districts = [
  {
    label: "Quận 1",
    value: "q1",
  },
  {
    label: "Quận 2",
    value: "q2",
  },
];

type FormValues = z.infer<typeof schema>;

function App() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      age: "",
      gender: "",
      district: "",
    },
  }); // 2. Use the hook useForm
  const { errors } = formState;
  console.log(errors);

  const handleSubmitForm = (values: FormValues) => {
    console.log(values);
  };

  return (
    <NextUIProvider>
      <div className="flex items-center justify-center min-h-screen bg-slate-800">
        <div className="">
          <Card className="w-[500px]">
            <CardHeader>Contact Form</CardHeader>
            <CardBody>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <Input
                  label="Email"
                  size="sm"
                  {...register("email")}
                  isInvalid={Boolean(errors?.email)}
                  errorMessage={errors?.email?.message as string}
                />

                <Input
                  label="Name"
                  size="sm"
                  {...register("name")}
                  isInvalid={Boolean(errors?.name)}
                  errorMessage={errors?.name?.message as string}
                />

                <Input
                  label="Age"
                  size="sm"
                  {...register("age")}
                  isInvalid={Boolean(errors?.age)}
                  errorMessage={errors?.age?.message as string}
                />

                <RadioGroup
                  label="Gender"
                  orientation="horizontal"
                  {...register("gender")}
                  isInvalid={Boolean(errors?.gender)}
                  errorMessage={errors?.gender?.message as string}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </RadioGroup>

                <Select
                  label="Select a district"
                  {...register("district")}
                  isInvalid={Boolean(errors?.district)}
                  errorMessage={errors?.district?.message as string}
                >
                  {districts.map((district) => (
                    <SelectItem key={district.value} value={district.value}>
                      {district.label}
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
      </div>
    </NextUIProvider>
  );
}

export default App;
