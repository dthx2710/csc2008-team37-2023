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

// step 4

const SymptomForm = ({ info, setStep, setProgress, setInfo, submitForm }) => {
  const {
    chestPain,
    coughingOfBlood,
    fatigue,
    weightLoss,
    shortnessOfBreath,
    wheezing,
    swallowingDifficulty,
    clubbingOfFingernails,
    frequentCold,
    dryCough,
    snoring,
  } = info;
  const symptomInit = {
    chestPain: chestPain ?? 1,
    coughingOfBlood: coughingOfBlood ?? 1,
    fatigue: fatigue ?? 1,
    weightLoss: weightLoss ?? 1,
    shortnessOfBreath: shortnessOfBreath ?? 1,
    wheezing: wheezing ?? 1,
    swallowingDifficulty: swallowingDifficulty ?? 1,
    clubbingOfFingernails: clubbingOfFingernails ?? 1,
    frequentCold: frequentCold ?? 1,
    dryCough: dryCough ?? 1,
    snoring: snoring ?? 1,
  };
  const symptomTooltip = {};
  const [values, setValues] = useState(symptomInit);
  const [showTooltip, setShowTooltip] = useState(symptomTooltip);
  const handleTooltip = (prop, value) => {
    setShowTooltip({ ...showTooltip, [prop]: value });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSliderChange = (prop) => async (val) => {
    await setValues({ ...values, [prop]: val });
    await setInfo({ ...info, ...values });
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
            aria-label="chest-pain-slider"
            defaultValue={1}
            min={1}
            max={9}
            onChange={handleSliderChange("chestPain")}
            value={values.chestPain}
            onMouseEnter={() => handleTooltip("chestPain", true)}
            onMouseLeave={() => handleTooltip("chestPain", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.chestPain}
              label={`${values.chestPain}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of chest pain</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="coughingOfBlood">Coughing of Blood</FormLabel>
          <Slider
            aria-label="coughing-slider"
            defaultValue={1}
            min={1}
            max={9}
            onChange={handleSliderChange("coughingOfBlood")}
            value={values.coughingOfBlood}
            onMouseEnter={() => handleTooltip("coughingOfBlood", true)}
            onMouseLeave={() => handleTooltip("coughingOfBlood", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.coughingOfBlood}
              label={`${values.coughingOfBlood}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of coughing of blood</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="fatigue">Fatigue</FormLabel>
          <Slider
            aria-label="fatigue-slider"
            defaultValue={1}
            min={1}
            max={9}
            onChange={handleSliderChange("fatigue")}
            value={values.fatigue}
            onMouseEnter={() => handleTooltip("fatigue", true)}
            onMouseLeave={() => handleTooltip("fatigue", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.fatigue}
              label={`${values.fatigue}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of fatigue</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="weightLoss">Weight Loss</FormLabel>
          <Slider
            aria-label="weight-loss-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("weightLoss")}
            value={values.weightLoss}
            onMouseEnter={() => handleTooltip("weightLoss", true)}
            onMouseLeave={() => handleTooltip("weightLoss", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.weightLoss}
              label={`${values.weightLoss}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of weight loss</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="shortnessOfBreath">Shortness Of Breath</FormLabel>
          <Slider
            aria-label="breath-slider"
            defaultValue={1}
            min={1}
            max={9}
            onChange={handleSliderChange("shortnessOfBreath")}
            value={values.shortnessOfBreath}
            onMouseEnter={() => handleTooltip("shortnessOfBreath", true)}
            onMouseLeave={() => handleTooltip("shortnessOfBreath", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.shortnessOfBreath}
              label={`${values.shortnessOfBreath}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of shortness of breath</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="wheezing">Wheezing</FormLabel>
          <Slider
            aria-label="wheezing-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("wheezing")}
            value={values.wheezing}
            onMouseEnter={() => handleTooltip("wheezing", true)}
            onMouseLeave={() => handleTooltip("wheezing", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.wheezing}
              label={`${values.wheezing}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of wheezing</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="swallowingDifficulty">
            Swallowing Difficulty
          </FormLabel>
          <Slider
            aria-label="swallowing-slider"
            defaultValue={1}
            min={1}
            max={8}
            onChange={handleSliderChange("swallowingDifficulty")}
            value={values.swallowingDifficulty}
            onMouseEnter={() => handleTooltip("swallowingDifficulty", true)}
            onMouseLeave={() => handleTooltip("swallowingDifficulty", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.swallowingDifficulty}
              label={`${values.swallowingDifficulty}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of sallowing difficulty</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="clubbingOfFingernails">
            Clubbing Of Fingernails
          </FormLabel>
          <Slider
            aria-label="clubbing-slider"
            defaultValue={1}
            min={1}
            max={9}
            onChange={handleSliderChange("clubbingOfFingernails")}
            value={values.clubbingOfFingernails}
            onMouseEnter={() => handleTooltip("clubbingOfFingernails", true)}
            onMouseLeave={() => handleTooltip("clubbingOfFingernails", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.clubbingOfFingernails}
              label={`${values.clubbingOfFingernails}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of clubbing of fingernails</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="frequentCold">Frequent Cold</FormLabel>
          <Slider
            aria-label="cold-slider"
            defaultValue={1}
            min={1}
            max={7}
            onChange={handleSliderChange("frequentCold")}
            value={values.frequentCold}
            onMouseEnter={() => handleTooltip("frequentCold", true)}
            onMouseLeave={() => handleTooltip("frequentCold", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.frequentCold}
              label={`${values.frequentCold}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of frequent cold</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="dryCough">Dry Cough</FormLabel>
          <Slider
            aria-label="cough-slider"
            defaultValue={1}
            min={1}
            max={7}
            onChange={handleSliderChange("dryCough")}
            value={values.dryCough}
            onMouseEnter={() => handleTooltip("dryCough", true)}
            onMouseLeave={() => handleTooltip("dryCough", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.dryCough}
              label={`${values.dryCough}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of dry cough</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="snoring">Snoring</FormLabel>
          <Slider
            aria-label="snoring-slider"
            defaultValue={1}
            min={1}
            max={7}
            onChange={handleSliderChange("snoring")}
            value={values.snoring}
            onMouseEnter={() => handleTooltip("snoring", true)}
            onMouseLeave={() => handleTooltip("snoring", false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip.snoring}
              label={`${values.snoring}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>Level of snoring</FormHelperText>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
        <Button
          type="button"
          onClick={() => {
            setStep(3);
            setProgress(50);
            setInfo({ ...info, ...values });
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          onClick={async (e) => {
            setStep(5);
            setProgress(100);
            await setInfo({ ...info, ...values });
            submitForm;
          }}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default SymptomForm;
