/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
} from "@chakra-ui/react";
import { useTable } from "react-table";
import Head from "next/head";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTable, setAllTable] = useState([]);
  const [patientTable, setPatientTable] = useState([]);
  const [internalTable, setInternalTable] = useState([]);
  const [externalTable, setExternalTable] = useState([]);
  const [symptomTable, setSymptomTable] = useState([]);
  const [riskTable, setRiskTable] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get("/api/db/patient");
    setData(result.data);
  };

  useEffect(() => {
    setPatientTable(
      data.map((patient) => {
        return {
          id: patient.patient_id,
          age: patient.age,
          gender: patient.gender === 1 ? "Male" : "Female",
          country: patient.country.country_name,
        };
      })
    );
    setInternalTable(
      data.map((patient) => {
        const internal = patient.Internal;
        return {
          id: patient.patient_id,
          alcohol_use: internal.alcohol_use,
          dust_allergy: internal.dust_allergy,
          genetic_risk: internal.genetic_risk,
          chronic_lung_disease: internal.chronic_lung_disease,
          balanced_diet: internal.balanced_diet,
          obesity: internal.obesity,
          active_smoking: internal.active_smoking,
          passive_smoking: internal.passive_smoking,
        };
      })
    );
    setExternalTable(
      data.map((patient) => {
        const external = patient.External;
        return {
          id: patient.patient_id,
          air_pollution: external.air_pollution,
          occupational_hazards: external.occupational_hazards,
        };
      })
    );
    setSymptomTable(
      data.map((patient) => {
        const symptoms = patient.symptoms;
        return {
          id: patient.patient_id,
          chest_pain: symptoms.chest_pain,
          coughing_of_blood: symptoms.coughing_of_blood,
          fatigue: symptoms.fatigue,
          weight_loss: symptoms.weight_loss,
          shortness_of_breath: symptoms.shortness_of_breath,
          wheezing: symptoms.wheezing,
          swallowing_difficulty: symptoms.swallowing_difficulty,
          clubbing_of_fingernails: symptoms.clubbing_of_fingernails,
          frequent_cold: symptoms.frequent_cold,
          dry_cough: symptoms.dry_cough,
          snoring: symptoms.snoring,
        };
      })
    );
    setRiskTable(
      data.map((patient) => {
        return {
          id: patient.patient_id,
          risk: patient.risk.risk,
        };
      })
    );

    //combine all table values into one array based on index
    setAllTable(
      patientTable.map((patient, index) => {
        return {
          ...patient,
          ...internalTable[index],
          ...externalTable[index],
          ...symptomTable[index],
          ...riskTable[index],
        };
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns = {
    all: [
      { Header: "Patient ID", accessor: "id", sortable: true },
      { Header: "Age", accessor: "age" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Country", accessor: "country" },
      { Header: "Alcohol Use", accessor: "alcohol_use" },
      { Header: "Dust Allergy", accessor: "dust_allergy" },
      { Header: "Genetic Risk", accessor: "genetic_risk" },
      { Header: "Chronic Lung Disease", accessor: "chronic_lung_disease" },
      { Header: "Balanced Diet", accessor: "balanced_diet" },
      { Header: "Obesity", accessor: "obesity" },
      { Header: "Active Smoking", accessor: "active_smoking" },
      { Header: "Passive Smoking", accessor: "passive_smoking" },
      { Header: "Air Pollution", accessor: "air_pollution" },
      { Header: "Occupational Hazards", accessor: "occupational_hazards" },
      { Header: "Chest Pain", accessor: "chest_pain" },
      { Header: "Coughing of Blood", accessor: "coughing_of_blood" },
      { Header: "Fatigue", accessor: "fatigue" },
      { Header: "Weight Loss", accessor: "weight_loss" },
      { Header: "Shortness of Breath", accessor: "shortness_of_breath" },
      { Header: "Wheezing", accessor: "wheezing" },
      { Header: "Swallowing Difficulty", accessor: "swallowing_difficulty" },
      { Header: "Risk", accessor: "risk" },
    ],
    patient: [
      { Header: "Patient ID", accessor: "id", sortable: true },
      { Header: "Age", accessor: "age" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Country", accessor: "country" },
    ],
    internal: [
      { Header: "Patient ID", accessor: "id", sortable: true },
      { Header: "Alcohol Use", accessor: "alcohol_use" },
      { Header: "Dust Allergy", accessor: "dust_allergy" },
      { Header: "Genetic Risk", accessor: "genetic_risk" },
      { Header: "Chronic Lung Disease", accessor: "chronic_lung_disease" },
      { Header: "Balanced Diet", accessor: "balanced_diet" },
      { Header: "Obesity", accessor: "obesity" },
      { Header: "Active Smoking", accessor: "active_smoking" },
      { Header: "Passive Smoking", accessor: "passive_smoking" },
    ],
    external: [
      { Header: "Patient ID", accessor: "id", sortable: true },
      { Header: "Air Pollution", accessor: "air_pollution" },
      { Header: "Occupational Hazards", accessor: "occupational_hazards" },
    ],
    symptom: [
      { Header: "Patient ID", accessor: "id", sortable: true },
      { Header: "Chest Pain", accessor: "chest_pain" },
      { Header: "Coughing of Blood", accessor: "coughing_of_blood" },
      { Header: "Fatigue", accessor: "fatigue" },
      { Header: "Weight Loss", accessor: "weight_loss" },
      { Header: "Shortness of Breath", accessor: "shortness_of_breath" },
      { Header: "Wheezing", accessor: "wheezing" },
      { Header: "Swallowing Difficulty", accessor: "swallowing_difficulty" },
      {
        Header: "Clubbing of Fingernails",
        accessor: "clubbing_of_fingernails",
      },
      { Header: "Frequent Cold", accessor: "frequent_cold" },
      { Header: "Dry Cough", accessor: "dry_cough" },
      { Header: "Snoring", accessor: "snoring" },
    ],
    risk: [
      { Header: "Patient ID", accessor: "id", sortable: true },
      { Header: "Risk", accessor: "risk" },
    ],
  };

  const DataTable = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      });

    return (
      <Table {...getTableProps()} variant="striped" colorScheme="gray">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  };

  const runQuery = async () => {
    // get query from text area
    const query = document.getElementById("query").value;
    // send query to backend
    const res = await fetch("/api/db/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    // alert response
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    }
    if (data.success) {
      alert(data.success);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="CSC2008 Team37" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mx="auto" maxWidth="90%">
        <Tabs variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>Main</Tab>
            <Tab>Patient</Tab>
            <Tab>Internal</Tab>
            <Tab>External</Tab>
            <Tab>Symptoms</Tab>
            <Tab>Risk</Tab>
            <Tab>SQL Editor</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div style={{ overflowX: "scroll" }}>
                <DataTable
                  columns={columns.all}
                  data={allTable}
                  keyField="id"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <DataTable
                columns={columns.patient}
                data={patientTable}
                keyField="id"
              />
            </TabPanel>
            <TabPanel>
              <DataTable
                columns={columns.internal}
                data={internalTable}
                keyField="id"
              />
            </TabPanel>
            <TabPanel>
              <DataTable
                columns={columns.external}
                data={externalTable}
                keyField="id"
              />
            </TabPanel>
            <TabPanel>
              <DataTable
                columns={columns.symptom}
                data={symptomTable}
                keyField="id"
              />
            </TabPanel>
            <TabPanel>
              <DataTable
                columns={columns.risk}
                data={riskTable}
                keyField="id"
              />
            </TabPanel>
            <TabPanel>
              <Box>
                <textarea
                  id="query"
                  style={{ width: "100%", height: "100%" }}
                  placeholder="e.g. SELECT * FROM Patient;"
                ></textarea>
              </Box>
              <Button colorScheme="teal" variant="outline" onClick={runQuery}>
                Run Query
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default AdminDashboard;
