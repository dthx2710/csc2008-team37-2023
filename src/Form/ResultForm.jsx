import React, { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
// step 5
const ResultForm = ({ info }) => {
    // const [showResult, setShowResult] = useState(false);

    // const handleShowResult = () => {
    //     setShowResult(!showResult);
    // };
    useEffect(() => {
        // post request to backend to insert new entry into database
    }, [info]);

    return (
        <>
            <Stack spacing={4}>
                <div className="result-form">
                    {<p>You are at a {info.risk} risk of lung cancer</p>}
                </div>
            </Stack>
        </>
    );
}

export default ResultForm;
