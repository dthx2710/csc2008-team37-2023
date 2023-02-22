import React, { useState, useEffect } from 'react';
import $ from 'jquery';

export default function Test() {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const jsonData = {
            // your JSON data here
        };
        $.ajax({
            url: "/api/hello",
            type: "POST",
            data: JSON.stringify(jsonData),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                setPredictions(response.predictions);
            },
            error: function (xhr, status, error) {
                console.error("Error: " + error);
            }
        });
    }, []);

    return (
        <div>
            <h1>Predictions</h1>
            <ul>
                {predictions.map((prediction, i) => (
                    <li key={i}>{prediction}</li>
                ))}
            </ul>
        </div>
    );
}
