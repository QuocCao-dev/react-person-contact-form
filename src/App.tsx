import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NextUIProvider,
} from "@nextui-org/react";

function App() {
  const handleSubmitForm = () => {};

  return (
    <NextUIProvider>
      <div className="flex items-center justify-center min-h-screen bg-slate-800">
        <div className="">
          <Card className="w-[500px]">
            <CardHeader>Contact Form</CardHeader>
            <CardBody>
              <form className="space-y-4" onSubmit={handleSubmitForm}>
                <Input label="Email" size="sm" />

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
