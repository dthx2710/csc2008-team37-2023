import { useState, useEffect } from 'react';
//prints out csv on a page
export default function Data() {
    const [csvData, setCsvData] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/cancer_patient_data_sets.csv');
            const data = await response.text();
            setCsvData(data);
        }
        fetchData();
    }, []);

    // parse the CSV data into an array of objects
    const rows = csvData.split('\n').map((row, index) => {
        if (index === 0) {
            // extract the headers from the first row
            const headers = row.split(',');
            return { headers };
        } else {
            // extract the values from the remaining rows
            const values = row.split(',');
            return { values };
        }
    });

    return (
        <div>
            <table>
                <thead>
                <tr>
                    {rows[0].headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.slice(1).map((row, index) => (
                    <tr key={index}>
                        {row.values.map(value => (
                            <td key={value}>{value}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
