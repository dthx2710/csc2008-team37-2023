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
  Tooltip,
} from "@chakra-ui/react";

// step 2

const ExternalForm = ({ info, setStep, setProgress, setInfo }) => {
  const { airPollution, occupationalHazards } = info;
  const externalInit = {
    airPollution: airPollution ?? 1,
    occupationalHazards: occupationalHazards ?? 1,
  };
  const externalTooltip = {};
  const [values, setValues] = useState(externalInit);
  const [showTooltip, setShowTooltip] = useState(externalTooltip);
  const handleTooltip = (prop, value) => {
    setShowTooltip({ ...showTooltip, [prop]: value });
  };
  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };
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
            onMouseEnter={() => handleTooltip("airPollution", true)}
            onMouseLeave={() => handleTooltip("airPollution", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.airPollution}
              label={`${values.airPollution}`}
            >
              <SliderThumb />
            </Tooltip>
            <SliderThumb />
          </Slider>
          <FormHelperText>Level of air pollution exposure</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="occupationalHazards">
            Occupational Hazards
          </FormLabel>
          <Slider
            aria-label="occupational-hazards-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("occupationalHazards")}
            value={values.occupationalHazards}
            onMouseEnter={() => handleTooltip("occupationalHazards", true)}
            onMouseLeave={() => handleTooltip("occupationalHazards", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.occupationalHazards}
              label={`${values.occupationalHazards}`}
            >
              <SliderThumb />
            </Tooltip>
            <SliderThumb />
          </Slider>
          <FormHelperText>Level of occupational hazards</FormHelperText>
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
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default ExternalForm;
