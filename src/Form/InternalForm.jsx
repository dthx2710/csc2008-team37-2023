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
  Tooltip,
} from "@chakra-ui/react";

// step 2

const InternalForm = ({ info, setStep, setProgress, setInfo }) => {
  const {
    alcoholUse,
    dustAllergy,
    geneticRisk,
    chronicLungDisease,
    balancedDiet,
    obesity,
    activeSmoking,
    passiveSmoking,
  } = info;
  const internalInit = {
    alcoholUse: alcoholUse ?? 1,
    dustAllergy: dustAllergy ?? 1,
    geneticRisk: geneticRisk ?? 1,
    chronicLungDisease: chronicLungDisease ?? 1,
    balancedDiet: balancedDiet ?? 1,
    obesity: obesity ?? 1,
    activeSmoking: activeSmoking ?? 1,
    passiveSmoking: passiveSmoking ?? 1,
  };
  const internalTooltip = {};
  const [values, setValues] = useState(internalInit);
  const [showTooltip, setShowTooltip] = useState(internalTooltip);
  const handleTooltip = (prop, value) => {
    setShowTooltip({ ...showTooltip, [prop]: value });
  };
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
            onChange={handleSliderChange("alcoholUse")}
            value={values.alcoholUse}
            onMouseEnter={() => handleTooltip("alcoholUse", true)}
            onMouseLeave={() => handleTooltip("alcoholUse", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.alcoholUse}
              label={`${values.alcoholUse}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of alcohol use</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="dustAllergy">Dust Allergy</FormLabel>
          <Slider
            aria-label="dust-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("dustAllergy")}
            value={values.dustAllergy}
            onMouseEnter={() => handleTooltip("dustAllergy", true)}
            onMouseLeave={() => handleTooltip("dustAllergy", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.dustAllergy}
              label={`${values.dustAllergy}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of dust allergy</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="geneticRisk">Genetic Risk</FormLabel>
          <Slider
            aria-label="genetic-slider"
            defaultValue={1}
            min={1}
            max={7}
            onChange={handleSliderChange("geneticRisk")}
            value={values.geneticRisk}
            onMouseEnter={() => handleTooltip("geneticRisk", true)}
            onMouseLeave={() => handleTooltip("geneticRisk", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.geneticRisk}
              label={`${values.geneticRisk}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of genetic risk</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="chronicLungDisease">
            Chronic Lung Disease
          </FormLabel>
          <Slider
            aria-label="lung-slider"
            defaultValue={1}
            min={1}
            max={7}
            onChange={handleSliderChange("chronicLungDisease")}
            value={values.chronicLungDisease}
            onMouseEnter={() => handleTooltip("chronicLungDisease", true)}
            onMouseLeave={() => handleTooltip("chronicLungDisease", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.chronicLungDisease}
              label={`${values.chronicLungDisease}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of chronic lung disease</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="balancedDiet">Balanced Diet</FormLabel>
          <Slider
            aria-label="diet-slider"
            defaultValue={1}
            min={1}
            max={7}
            onChange={handleSliderChange("balancedDiet")}
            value={values.balancedDiet}
            onMouseEnter={() => handleTooltip("balancedDiet", true)}
            onMouseLeave={() => handleTooltip("balancedDiet", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.balancedDiet}
              label={`${values.balancedDiet}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of balanced diet</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="obesity">Obesity</FormLabel>
          <Slider
            aria-label="obesity-slider"
            defaultValue={1}
            min={1}
            max={7}
            onChange={handleSliderChange("obesity")}
            value={values.obesity}
            onMouseEnter={() => handleTooltip("obesity", true)}
            onMouseLeave={() => handleTooltip("obesity", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.obesity}
              label={`${values.obesity}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of obesity</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="activeSmoking">Active Smoking</FormLabel>
          <Slider
            aria-label="active-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("activeSmoking")}
            value={values.activeSmoking}
            onMouseEnter={() => handleTooltip("activeSmoking", true)}
            onMouseLeave={() => handleTooltip("activeSmoking", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.activeSmoking}
              label={`${values.activeSmoking}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of active smoking</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="passiveSmoking">Passive Smoking</FormLabel>
          <Slider
            aria-label="passive-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("passiveSmoking")}
            value={values.passiveSmoking}
            onMouseEnter={() => handleTooltip("passiveSmoking", true)}
            onMouseLeave={() => handleTooltip("passiveSmoking", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.passiveSmoking}
              label={`${values.passiveSmoking}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of passive smoking</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <Button
          type="button"
          onClick={() => {
            setStep(1);
            setProgress(0);
            setInfo({ ...info, ...values });
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
