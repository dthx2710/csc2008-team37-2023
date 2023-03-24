/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
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
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  IconButton,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTable, usePagination } from "react-table";
import Head from "next/head";
import axios from "axios";

//Icon & images imports
import { RiSurveyLine } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";
import { ImManWoman } from "react-icons/im";
import { FiAlertTriangle } from "react-icons/fi";
import { SlEmotsmile } from "react-icons/sl";

//chart.js
import { Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
} from "chart.js/auto";

Chart.register(ArcElement, LineController, LineElement, PointElement);

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTable, setAllTable] = useState([]);
  const [patientTable, setPatientTable] = useState([]);
  const [internalTable, setInternalTable] = useState([]);
  const [externalTable, setExternalTable] = useState([]);
  const [symptomTable, setSymptomTable] = useState([]);
  const [riskTable, setRiskTable] = useState([]);
  const [genderData, setGenderData] = useState({});

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
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const gender = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Gender",
        data: [
          data.filter((row) => {
            return row.gender === 2;
          }).length,
          data.filter((row) => {
            return row.gender === 1;
          }).length,
        ],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  const country = {
    labels: [
      "Singapore",
      "Japan",
      "South Korea",
      "India",
      "Malaysia",
      "China",
      "Indonesia",
      "Philippines",
      "Vietnam",
      "Thailand",
    ],
    datasets: [
      {
        label: "Country",
        data: [
          data.filter((row) => {
            return row.country.country_name === "Singapore";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "Japan";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "South Korea";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "India";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "Malaysia";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "China";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "Indonesia";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "Philippines";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "Vietnam";
          }).length,
          data.filter((row) => {
            return row.country.country_name === "Thailand";
          }).length,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(0, 99, 132)",
          "rgb(255, 162, 235)",
          "rgb(155, 205, 86)",
          "rgb(200, 192, 192)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const labels = ["2020", "2021", "2022", "2023", "2024"];
  const risk = {
    labels: labels,
    datasets: [
      {
        label: "Risk of illness",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

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
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 },
      },
      usePagination
    );

    return (
      <>
        <Table {...getTableProps()} variant="striped" colorScheme="gray">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                  <Td>
                    <IconButton
                      onClick={() => handleEdit(row)}
                      icon={<EditIcon />}
                      aria-label="Edit"
                      colorScheme="blue"
                    />
                    <IconButton
                      onClick={() => handleDelete(row)}
                      icon={<DeleteIcon />}
                      aria-label="Delete"
                      colorScheme="red"
                      ml={2}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex justify="center" mt={4}>
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            mr={2}
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            mr={2}
          >
            {"<"}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage} mr={2}>
            {">"}
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            mr={2}
          >
            {">>"}
          </Button>
          <Text>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </Text>
          <Select
            ml={2}
            w={20}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </>
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
      {loading ? (
        <Flex justify="center" align="center" h="100vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box mx="auto" maxWidth="90%">
          <Tabs variant="enclosed" colorScheme="teal">
            <TabList>
              <Tab>Dashboard</Tab>
              <Tab>Main</Tab>
              <Tab>Patient</Tab>
              <Tab>Internal</Tab>
              <Tab>External</Tab>
              <Tab>Symptoms</Tab>
              <Tab>Risk</Tab>
              <Tab>SQL Editor</Tab>
              <Tab>Correlation Heatmap</Tab>
            </TabList>

            {/* Dashboard Tab */}
            <TabPanels>
              <TabPanel>
                <Grid templateRows="repeat(1, 1fr)">
                  <Card>
                    <CardHeader>
                      <Heading size="md"> Summary</Heading>
                    </CardHeader>
                    <CardBody>
                      <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(6, 1fr)"
                        gap="6"
                      >
                        <GridItem colSpan={2}>
                          <Box
                            align="center"
                            bg="blue.500"
                            borderRadius="md"
                            p={7}
                            color="white"
                          >
                            <RiSurveyLine size="24px" /> {data.length} Responses
                          </Box>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <Box
                            align="center"
                            bg="green.500"
                            borderRadius="md"
                            p={7}
                            color="white"
                          >
                            <SlEmotsmile size="24px" />{" "}
                            {(
                              (data.filter((row) => row.risk.risk === "Low")
                                .length /
                                data.length) *
                              100
                            ).toFixed(2)}
                            % Low risk
                          </Box>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <Box
                            align="center"
                            bg="red.500"
                            borderRadius="md"
                            p={7}
                            color="white"
                          >
                            <FiAlertTriangle size="24px" />{" "}
                            {(
                              (data.filter((row) => row.risk.risk === "High")
                                .length /
                                data.length) *
                              100
                            ).toFixed(2)}
                            % High risk
                          </Box>
                        </GridItem>
                      </Grid>
                    </CardBody>
                    <CardFooter>{/* Insert Footer if any */}</CardFooter>
                  </Card>
                </Grid>
                <br></br>
                <Grid
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(4, 1fr)"
                  gap={4}
                >
                  <GridItem colSpan={2}>
                    <Card>
                      <CardHeader>
                        <ImManWoman size="20px" />
                      </CardHeader>
                      <CardBody>
                        <Doughnut
                          data={gender}
                          options={{ maintainAspectRatio: false }}
                        />
                      </CardBody>
                      <CardFooter>{/* Insert Footer if any */}</CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Card>
                      <CardHeader>
                        <BiWorld size="24px" />
                      </CardHeader>
                      <CardBody>
                        <Pie
                          data={country}
                          options={{ maintainAspectRatio: false }}
                        />
                      </CardBody>
                      <CardFooter>{/* Insert Footer if any */}</CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Card>
                      <CardHeader>
                        <Heading size="md"> Predictive analysis</Heading>
                      </CardHeader>
                      <CardBody>
                        <Line
                          data={risk}
                          options={{ maintainAspectRatio: false }}
                        />
                      </CardBody>
                      <CardFooter>{/* Insert Footer if any */}</CardFooter>
                    </Card>
                  </GridItem>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Card>
                  <CardHeader>
                    <Heading size="md"> Filter</Heading>
                  </CardHeader>
                  <CardBody>
                    <FormControl>
                      <Grid
                        templateRows="repeat(3, 1fr)"
                        templateColumns="repeat(6, 1fr)"
                        gap={4}
                      >
                        <GridItem colSpan={2}>
                          <FormLabel>Age</FormLabel>
                          <Select placeholder="Select age range">
                            <option>21-25</option>
                            <option>26-30</option>
                            <option>31-35</option>
                            <option>36-40</option>
                            <option>41-45</option>
                            <option>46-50</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Gender</FormLabel>
                          <Select placeholder="Select gender">
                            <option>Male</option>
                            <option>Female</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Country</FormLabel>
                          <Select placeholder="Select country">
                            <option>Singapore</option>
                            <option>Malaysia</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>External</FormLabel>
                          <Select placeholder="Select options">
                            <option>Air Pollution</option>
                            <option>Occupational Hazards</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Internal</FormLabel>
                          <Select placeholder="Select options">
                            <option>Alcohol Use</option>
                            <option>Dust Allergy</option>
                            <option>Genetic Risk</option>
                            <option>Chronic Lung Desease</option>
                            <option>Balanced Diet</option>
                            <option>Obesity</option>
                            <option>Active Smoking</option>
                            <option>Passive Smoking</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Symptoms</FormLabel>
                          <Select placeholder="Select symptoms">
                            <option>Chest Pain</option>
                            <option>Coughing of Blood</option>
                            <option>Fatigue</option>
                            <option>Weight Loss</option>
                            <option>Shortness of Breath</option>
                            <option>Wheezing</option>
                            <option>Swallowing Difficulty</option>
                            <option>Clubbing of Fingernails</option>
                            <option>Frequent Cold</option>
                            <option>Dry Cough</option>
                            <option>Snoring</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Risk</FormLabel>
                          <Select placeholder="Select risk level">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </Select>
                        </GridItem>
                      </Grid>
                    </FormControl>
                  </CardBody>
                  <CardFooter>{/* Insert Footer if any */}</CardFooter>
                </Card>
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

              {/* SQL Editor Tab */}
              <TabPanel id="sql-editor">
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
                <Card>
                  <CardHeader>
                    <Heading size="md"> Result</Heading>
                  </CardHeader>
                  <CardBody>{/* TODO */}</CardBody>
                  <CardFooter>{/* Insert Footer if any */}</CardFooter>
                </Card>
              </TabPanel>
              <TabPanel>
                <img
                  src="Heatmap.png"
                  alt="Correlation Heatmap"
                  width="700"
                  height="600"
                ></img>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
      ;
    </>
  );
};

export default AdminDashboard;
