/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Image,
  Center,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useTable, usePagination, useSortBy } from "react-table";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

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
  const [tableViewFilter, setTableViewFilter] = useState(["Patient Info"]);
  const [patientFilter, setPatientFilter] = useState({
    age: [0, 100],
    gender: "",
    country: "",
    risk: "",
  });

  const handleTableViewFilter = (e) => {
    const value = e.target.value;
    if (value === "All Tables") {
      setTableViewFilter([
        "Patient Info",
        "Internal Factors",
        "External Factors",
        "Symptoms",
      ]);
    } else {
      setTableViewFilter([value]);
    }
  };

  const handlePatientFilter = (props) => (e) => {
    const value = e.target.value;
    // destructure
    if (props === "age") {
      if (value === "")
        setPatientFilter({ ...patientFilter, [props]: [0, 100] });
      const age = value.split("-").map((x) => parseInt(x));
      setPatientFilter({ ...patientFilter, [props]: age });
    } else setPatientFilter({ ...patientFilter, [props]: value });
  };

  const resetFilter = () => {
    setPatientFilter({
      age: [0, 100],
      gender: "",
      country: "",
      risk: "",
    });
  };

  const router = useRouter();

  const fetchData = async () => {
    const result = await axios.get("/api/db/patient");
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableData = useMemo(() => {
    if (data.length > 0) {
      setLoading(false);
      return data
        .map((patient) => {
          return {
            id: patient.patient_id,
            age: patient.age,
            gender: patient.gender === 1 ? "Male" : "Female",
            country: patient.country.country_name,
            alcohol_use: patient.Internal.alcohol_use,
            dust_allergy: patient.Internal.dust_allergy,
            genetic_risk: patient.Internal.genetic_risk,
            chronic_lung_disease: patient.Internal.chronic_lung_disease,
            balanced_diet: patient.Internal.balanced_diet,
            obesity: patient.Internal.obesity,
            active_smoking: patient.Internal.active_smoking,
            passive_smoking: patient.Internal.passive_smoking,
            air_pollution: patient.External.air_pollution,
            occupational_hazards: patient.External.occupational_hazards,
            chest_pain: patient.symptoms.chest_pain,
            coughing_of_blood: patient.symptoms.coughing_of_blood,
            fatigue: patient.symptoms.fatigue,
            weight_loss: patient.symptoms.weight_loss,
            shortness_of_breath: patient.symptoms.shortness_of_breath,
            wheezing: patient.symptoms.wheezing,
            swallowing_difficulty: patient.symptoms.swallowing_difficulty,
            clubbing_of_fingernails: patient.symptoms.clubbing_of_fingernails,
            frequent_cold: patient.symptoms.frequent_cold,
            dry_cough: patient.symptoms.dry_cough,
            snoring: patient.symptoms.snoring,
            risk: patient.risk.risk,
          };
        })
        .filter((row) => {
          return (
            row.age >= patientFilter.age[0] &&
            row.age <= patientFilter.age[1] &&
            row.country === (patientFilter.country || row.country) &&
            row.gender === (patientFilter.gender || row.gender) &&
            row.risk === (patientFilter.risk || row.risk)
          );
        });
    }
  }, [data, patientFilter]);

  const handleDelete = useCallback(
    async (id) => {
      const del = tableData[id].id;
      if (del) {
        // prompt user to confirm delete
        const confirm = window.confirm(
          "Are you sure you want to delete this patient?"
        );
        if (!confirm) return;
        await axios.delete(`/api/db/patient/${del}`);
        fetchData();
        // notify user of success
        alert("Patient deleted successfully");
      } else {
        alert("Patient not found");
      }
    },
    [tableData]
  );

  const handleEdit = useCallback(
    async (id) => {
      const edit = tableData[id].patient_id;
      if (edit) {
        // prompt user to confirm edit
        const prompt = parseInt(window.prompt("Enter new country id (1-10):"));
        if (prompt < 1 || prompt > 9) {
          await axios.put(`/api/db/patient/${edit}`, {
            country_id: prompt,
          });
          fetchData();
          // notify user of success
          alert("Patient country updated successfully");
        } else {
          alert("Invalid country id");
        }
      } else {
        alert("Patient not found");
      }
    },
    [tableData]
  );

  const handleLogout = async () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    router.push("/login");
  };

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

  const columns = useMemo(
    () => [
      {
        Header: "Patient Info",
        columns: [
          {
            Header: "Patient ID",
            accessor: "id",
            sortable: true,
            show: true,
          },
          {
            Header: "Age",
            accessor: "age",
            show: tableViewFilter.includes("Patient Info"),
          },
          {
            Header: "Gender",
            accessor: "gender",
            show: tableViewFilter.includes("Patient Info"),
          },
          {
            Header: "Country",
            accessor: "country",
            show: tableViewFilter.includes("Patient Info"),
          },
          {
            Header: "Risk",
            accessor: "risk",
            show: tableViewFilter.includes("Patient Info"),
          },
        ],
        show: tableViewFilter.includes("Patient Info"),
      },
      {
        Header: "Internal Factors",
        columns: [
          {
            Header: "Alcohol Use",
            accessor: "alcohol_use",
            show: tableViewFilter.includes("Internal Factors"),
          },
          {
            Header: "Dust Allergy",
            accessor: "dust_allergy",
            show: tableViewFilter.includes("Internal Factors"),
          },
          {
            Header: "Genetic Risk",
            accessor: "genetic_risk",
            show: tableViewFilter.includes("Internal Factors"),
          },
          {
            Header: "Chronic Lung Disease",
            accessor: "chronic_lung_disease",
            show: tableViewFilter.includes("Internal Factors"),
          },
          {
            Header: "Balanced Diet",
            accessor: "balanced_diet",
            show: tableViewFilter.includes("Internal Factors"),
          },
          {
            Header: "Obesity",
            accessor: "obesity",
            show: tableViewFilter.includes("Internal Factors"),
          },
          {
            Header: "Active Smoking",
            accessor: "active_smoking",
            show: tableViewFilter.includes("Internal Factors"),
          },
          {
            Header: "Passive Smoking",
            accessor: "passive_smoking",
            show: tableViewFilter.includes("Internal Factors"),
          },
        ],
        show: tableViewFilter.includes("Internal Factors"),
      },
      {
        Header: "External Factors",
        columns: [
          {
            Header: "Air Pollution",
            accessor: "air_pollution",
            show: tableViewFilter.includes("External Factors"),
          },
          {
            Header: "Occupational Hazards",
            accessor: "occupational_hazards",
            show: tableViewFilter.includes("External Factors"),
          },
        ],
        show: tableViewFilter.includes("External Factors"),
      },
      {
        Header: "Symptoms",
        columns: [
          {
            Header: "Chest Pain",
            accessor: "chest_pain",
            show: tableViewFilter.includes("Symptoms"),
          },
          {
            Header: "Coughing of Blood",
            accessor: "coughing_of_blood",
            show: tableViewFilter.includes("Symptoms"),
          },
          { Header: "Fatigue", accessor: "fatigue" },
          {
            Header: "Weight Loss",
            accessor: "weight_loss",
            show: tableViewFilter.includes("Symptoms"),
          },
          {
            Header: "Shortness of Breath",
            accessor: "shortness_of_breath",
            show: tableViewFilter.includes("Symptoms"),
          },
          {
            Header: "Wheezing",
            accessor: "wheezing",
            show: tableViewFilter.includes("Symptoms"),
          },
          {
            Header: "Swallowing Difficulty",
            accessor: "swallowing_difficulty",
            show: tableViewFilter.includes("Symptoms"),
          },
        ],
        show: tableViewFilter.includes("Symptoms"),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <Flex>
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              onClick={() => {
                handleEdit(row.id);
              }}
              colorScheme="yellow"
              mr={2}
            />
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              onClick={() => {
                handleDelete(row.id);
              }}
              colorScheme="red"
            />
          </Flex>
        ),
        show: true,
      },
    ],
    [handleDelete, handleEdit, tableViewFilter]
  );

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
      useSortBy,
      usePagination
    );

    return (
      <>
        <div
          className="tableWrap"
          style={{
            display: "block",
            maxWidth: "100%",
            overflowX: "scroll",
            overflowY: "hidden",
            borderBottom: "1px solid black",
          }}
          onScroll={(e) => handleScroll(e)}
        >
          <Table
            {...getTableProps()}
            variant="striped"
            colorScheme="linkedin"
            style={{ width: "100%", borderSpacing: "0" }}
          >
            <Thead>
              {headerGroups.map(
                (headerGroup) =>
                  true && (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(
                        (column) =>
                          column.show && (
                            <Th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </Th>
                          )
                      )}
                    </Tr>
                  )
              )}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        cell.column.show && (
                          <Td {...cell.getCellProps()}>
                            {cell.column.Header === "Risk" ? (
                              cell.value === "High" ? (
                                <Badge colorScheme="red">
                                  {cell.render("Cell")}
                                </Badge>
                              ) : cell.value === "Medium" ? (
                                <Badge colorScheme="yellow">
                                  {cell.render("Cell")}
                                </Badge>
                              ) : (
                                <Badge colorScheme="green">
                                  {cell.render("Cell")}
                                </Badge>
                              )
                            ) : (
                              cell.render("Cell")
                            )}
                          </Td>
                        )
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
        <Flex justify="center" mt={4} align="center">
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
          <Center height="50px">
            <Text margin="0 10px">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </Text>
            <Divider orientation="vertical" />
            <Text margin="0 10px"> Go to page: </Text>
          </Center>
          <Input
            ml={2}
            w={20}
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
          <Select
            ml={2}
            w={"max"}
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
              <Tab>SQL Editor</Tab>
              <Tab>Correlation Heatmap</Tab>
              <Button
                size="sm"
                borderColor="red.500"
                colorScheme="red"
                variant="outline"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </Button>
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
                        <GridItem colSpan={6}>
                          <FormLabel>Table View</FormLabel>
                          <Select onChange={handleTableViewFilter}>
                            <option>Patient Info</option>
                            <option>Internal Factors</option>
                            <option>External Factors</option>
                            <option>Symptoms</option>
                            <option>All Tables</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Age</FormLabel>
                          <Select
                            placeholder="Select age range"
                            onChange={handlePatientFilter("age")}
                          >
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
                          <Select
                            placeholder="Select gender"
                            onChange={handlePatientFilter("gender")}
                          >
                            <option>Male</option>
                            <option>Female</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Country</FormLabel>
                          <Select
                            placeholder="Select country"
                            onChange={handlePatientFilter("country")}
                          >
                            <option>Singapore</option>
                            <option>Japan</option>
                            <option>South Korea</option>
                            <option>India</option>
                            <option>China</option>
                            <option>Indonesia</option>
                            <option>Philippines</option>
                            <option>Vietnam</option>
                            <option>Malaysia</option>
                            <option>Thailand</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Risk</FormLabel>
                          <Select
                            placeholder="Select risk level"
                            onChange={handlePatientFilter("risk")}
                          >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormLabel>Actions</FormLabel>
                          <Flex>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              onClick={resetFilter}
                              mr={2}
                            >
                              Reset Filters
                            </Button>
                            <Button
                              colorScheme="pink"
                              variant="outline"
                              onClick={fetchData}
                            >
                              Refresh Table
                            </Button>
                          </Flex>
                        </GridItem>
                      </Grid>
                    </FormControl>
                  </CardBody>
                  <CardFooter>{/* Insert Footer if any */}</CardFooter>
                </Card>
                <br></br>
                <Card>
                  <CardBody>
                    <DataTable
                      columns={columns}
                      data={tableData}
                      keyField="id"
                    />
                  </CardBody>
                  <CardFooter>{/* Insert Footer if any */}</CardFooter>
                </Card>
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
                <Image
                  src="Heatmap.png"
                  alt="Correlation Heatmap"
                  width="700"
                  height="600"
                ></Image>
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
