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

// step 2

const ExternalForm = ({ info, setStep, setProgress, setInfo }) => {
  const { airPollution } = info;
  const externalInit = { airPollution: airPollution??1 };
  const [values, setValues] = useState(externalInit);
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
          <center>External Factors</center>
        </Text>
        <FormControl>
          <FormLabel htmlFor="airPollution">Air Pollution</FormLabel>
          <Slider
            aria-label="air-pollution-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("airPollution")}
            value={values.airPollution}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <FormHelperText>Level of air pollution exposure</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button
          type="button"
          onClick={() => {
            setStep(2);
            setProgress(25);
            setInfo({ ...info, ...values });
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={() => {
            setStep(4);
            setProgress(75);
            setInfo({ ...info, ...values });
            console.log(info);
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default ExternalForm;
