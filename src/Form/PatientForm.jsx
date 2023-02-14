import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Select,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

//step 1

const PatientForm = ({ info, setStep, setProgress, setInfo }) => {
  const patientInit = { age: '', gender: 0 };
  const [values, setValues] = useState(patientInit);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <>
      <Stack spacing={4}>
        <Text as="samp" fontSize="l" mt={2} mb={5}>
          <center>Personal Information</center>
        </Text>
        <FormControl>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select
            id="gender"
            value={values.gender}
            onChange={handleChange("gender")}
          >
            <option value="">Select</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </Select>
          <FormHelperText>Please select your gender</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="age">Age</FormLabel>
          <NumberInput
            id="age"
            type="number"
            value={values.age}
            min = {1}
            max = {100}
          >
            <NumberInputField 
            onChange={handleChange("age")}/>
          </NumberInput>
          <FormHelperText>Please enter your age</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button
          type="button"
          onClick={() => {
            setStep(2);
            setProgress(25);

            console.log(info);
            setInfo({ ...info, ...values });
            console.log(values);
            console.log(info);
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default PatientForm;
