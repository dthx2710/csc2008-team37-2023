import React, { useEffect, useState } from "react";
import { Container, Progress, Center, Heading } from "@chakra-ui/react";
import Head from "next/head";
import PatientForm from "@/src/Form/PatientForm";
import InternalForm from "@/src/Form/InternalForm";
import ExternalForm from "@/src/Form/ExternalForm";
import SymptomForm from "@/src/Form/SymptomForm";
import ResultForm from "@/src/Form/ResultForm";
import Brand from "@/src/components/Brand";

const Form = () => {
  const [info, setInfo] = useState({});
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      handleSubmit();
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  useEffect(() => {
    if (info.risk) {
      createPatient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info?.risk]);

  const handleSubmit = async () => {
    const risk = await fetch("/api/ml/naive_bayes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    }).then((res) => res.json());
    setInfo({ ...info, risk: risk.result });
  };

  const createPatient = async () => {
    // POST /api/db/patient
    const patient = await fetch("/api/db/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: info.age,
        gender: info.gender,
        country_id: info.country,
      }),
    }).then((res) => res.json());
    // POST /api/db/internal
    fetch(`/api/db/internal/${patient.patient_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alcohol_use: info.alcoholUse,
        dust_allergy: info.dustAllergy,
        genetic_risk: info.geneticRisk,
        chronic_lung_disease: info.chronicLungDisease,
        balanced_diet: info.balancedDiet,
        obesity: info.obesity,
        active_smoking: info.activeSmoking,
        passive_smoking: info.passiveSmoking,
      }),
    });
    // // POST /api/db/external
    fetch(`/api/db/external/${patient.patient_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        air_pollution: info.airPollution,
        occupational_hazards: info.occupationalHazards,
      }),
    });
    // // POST /api/db/symptoms
    fetch(`/api/db/symptom/${patient.patient_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chest_pain: info.chestPain,
        coughing_of_blood: info.coughingOfBlood,
        fatigue: info.fatigue,
        weight_loss: info.weightLoss,
        shortness_of_breath: info.shortnessOfBreath,
        wheezing: info.wheezing,
        swallowing_difficulty: info.swallowingDifficulty,
        clubbing_of_fingernails: info.clubbingOfFingernails,
        frequent_cold: info.frequentCold,
        dry_cough: info.dryCough,
        snoring: info.snoring,
      }),
    });
    // POST /api/db/risk
    fetch(`/api/db/risk/${patient.patient_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        risk: info.risk,
      }),
    });
  };

  return (
    <>
      <Head>
        <title>Risk Assessment</title>
      </Head>
      <main>
        <Center>
          <Container p={4} mt={30} maxW={`${step === 5 ? "1500px" : "lg"}`}>
            <Heading mb={5}>
              <Brand />
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
                  setSubmit={setSubmit}
                />
              )}
              {step === 5 && <ResultForm info={info}></ResultForm>}
            </form>
          </Container>
        </Center>
      </main>
    </>
  );
};

export default Form;
