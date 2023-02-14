import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

// step 4

const SymptomForm = ({ info, setStep, setProgress, setInfo }) => {
  const symptomInit = { chestPain: 1 };
  const [values, setValues] = useState(symptomInit);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSliderChange = (prop) => (val) => {
    setValues({ ...values, [prop]: val });
  };
  return (
    <>
      <Stack spacing={4}>
        <Text as="samp" fontSize="l" mt={2} mb={5}>
          <center>Symptoms</center>
        </Text>
        <FormControl>
          <FormLabel htmlFor="chestPain">Chest Pain</FormLabel>
          <Slider
            aria-label="air-pollution-slider"
            defaultValue={1}
            min={1}
            max={9}
            onChangeEnd={handleSliderChange("chestPain")}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <FormHelperText>Level of chest pain</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button
          type="button"
          onClick={() => {
            setStep(3);
            setProgress(50);
          }}
        >
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </Stack>
    </>
  );
};

export default SymptomForm;
