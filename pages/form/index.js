import React, { useEffect, useState } from "react";
import { Container, Progress, Center, Heading } from "@chakra-ui/react";
import Head from "next/head";
import PatientForm from "@/src/Form/PatientForm";
import InternalForm from "@/src/Form/InternalForm";
import ExternalForm from "@/src/Form/ExternalForm";
import SymptomForm from "@/src/Form/SymptomForm";

const Form = () => {
  const [info, setInfo] = useState({});
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStep(1);
    setProgress(0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ info });
  };

  return (
    <>
      <Head>
        <title>Risk Assessment</title>
      </Head>
      <main>
        <Center maxW={"3x1"}>
          <Container p={4} mt={30}>
            <Heading mb={20}>
              <center>Risk Assessment</center>
            </Heading>
            <Progress value={progress} />
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <PatientForm
                  info={info}
                  setInfo={setInfo}
                  setStep={setStep}
                  setProgress={setProgress}
                />
              )}
              {step === 2 && (
                <InternalForm
                  info={info}
                  setInfo={setInfo}
                  setStep={setStep}
                  setProgress={setProgress}
                />
              )}
              {step === 3 && (
                <ExternalForm
                  info={info}
                  setInfo={setInfo}
                  setStep={setStep}
                  setProgress={setProgress}
                />
              )}
              {step === 4 && (
                <SymptomForm
                  info={info}
                  setInfo={setInfo}
                  setStep={setStep}
                  setProgress={setProgress}
                />
              )}
            </form>
          </Container>
        </Center>
      </main>
    </>
  );
};

export default Form;
