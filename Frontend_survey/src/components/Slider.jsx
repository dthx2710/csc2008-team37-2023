import React from "react";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";

export default function ChakraSlider({ value, setDataValue }) {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <Slider
      id="slider"
      defaultValue={0}
      min={0}
      max={10}
      colorScheme="blue"
      onChange={(v) => setDataValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="blue.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={value}
      >
        <SliderThumb
          boxSize={5}
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          _focus={{
            boxShadow: "none",
            scale: 1,
          }}
        />
      </Tooltip>
    </Slider>
  );
}
