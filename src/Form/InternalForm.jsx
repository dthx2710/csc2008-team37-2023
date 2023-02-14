import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

// step 2

const InternalForm = ({ info, setStep, setProgress, setInfo }) => {
  const internalInit = { alcoholUse: 1 };
  const [values, setValues] = useState(internalInit);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event });
  };
  const handleSliderChange = (prop) => (val) => {
    setValues({ ...values, [prop]: val });
  };
  return (
    <>
      <Stack spacing={4}>
        <Text as="samp" fontSize="l" mt={2} mb={5}>
          <center>Internal Factors</center>
        </Text>
        <FormControl>
          <FormLabel htmlFor="alcoholUse">Alcohol Use</FormLabel>
          <Slider
            aria-label="alcohol-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChangeEnd={handleSliderChange("alcoholUse")}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <FormHelperText>Level of alcohol use</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <Button
          type="button"
          onClick={() => {
            setStep(1);
            setProgress(0);
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={() => {
            setStep(3);
            setProgress(50);
            setInfo({ ...info, ...values });
            console.log(values);
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default InternalForm;
