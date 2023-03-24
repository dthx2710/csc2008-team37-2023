import React, { useEffect } from "react";
import { Stack, Flex, Spinner } from "@chakra-ui/react";
// step 5
const ResultForm = ({ info }) => {
  const [loading, setLoading] = useState(false);
  // spinner for loading
  useEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    if (info.risk !== undefined) {
      setLoading(false);
    }
  }, [info.risk]);
  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="100vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Stack spacing={4}>
          <div className="result-form">
            {<p>You are at a {info.risk} risk of lung cancer</p>}
          </div>
        </Stack>
      )}
    </>
  );
};

export default ResultForm;
