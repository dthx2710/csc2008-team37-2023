/* eslint-disable react/jsx-key */
import React from "react";
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
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTable } from "react-table";
import Head from "next/head";

//Icon & images imports
import { RiSurveyLine } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";
import { ImManWoman } from "react-icons/im";
import { FiAlertTriangle } from "react-icons/fi";
import { SlEmotsmile } from "react-icons/sl";

//chart.js
import { Doughnut, Line, Pie } from 'react-chartjs-2'
import { Chart, ArcElement, LineController, LineElement, PointElement } from 'chart.js/auto'
import { Griffy } from "@next/font/google";

Chart.register(ArcElement, LineController, LineElement, PointElement)

const gender = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      label: 'Gender',
      data: [40, 60],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }
  ]
};

const country = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'Country',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const labels = ['2020', '2021', '2022', '2023', '2024'];
const riskdata = {
  labels: labels,
  datasets: [{
    label: 'Risk of illness',
    data: [65, 59, 80, 81, 56],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const data = [
  { key: "1", name: "John", age: 30, gender: "Male", external: "Air Pollution", internal: "Obesity", risk: "Medium" },
  { key: "2", name: "Jane", age: 25, gender: "Female", external: "Air Pollution", internal: "Dust Allergy", risk: "Low" },
  { key: "3", name: "Bob", age: 40, gender: "Male", external: "Occupational Hazards", internal: "Active Smoking", risk: "High" },
  { key: "4", name: "Alice", age: 23, gender: "Female", external: "Occupational Hazards", internal: "Genetic Risk", risk: "Medium" },
];

const columns = [
  { Header: "Key", accessor: "key", sortable: true },
  { Header: "Name", accessor: "name" },
  { Header: "Age", accessor: "age" },
  { Header: "Gender", accessor: "gender" },
  { Header: "External", accessor: "external" },
  { Header: "Internal", accessor: "internal" },
  { Header: "Risk Level", accessor: "risk" },
];

function DataTable({ columns, data }) {
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
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
              <Td>
                <IconButton
                  onClick={() => handleEdit(row)}
                  icon={<EditIcon />}
                  colorScheme="blue"
                  aria-label="Edit"
                />
              </Td>
              <Td>
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
  );
}

function AdminDashboard() {
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
            <Tab>Dashboard</Tab>
            <Tab>Patient Data</Tab>
            <Tab>SQL Editor</Tab>
          </TabList>


          {/* Dashboard Tab */}
          <TabPanels>
            <TabPanel id='dashboard'>
              <Grid
                templateRows='repeat(1, 1fr)'
              >
                <Card>
                  <CardHeader>
                    <Heading size='md'> Summary</Heading>
                  </CardHeader>
                  <CardBody>
                    <Grid
                      templateRows='repeat(1, 1fr)'
                      templateColumns='repeat(6, 1fr)'
                      gap='6'
                    >
                      <GridItem colSpan={2}>
                        <Box align='center' bg='blue.500' borderRadius='md' p={7} color='white'><RiSurveyLine size='24px' /> xx Responses</Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box align='center' bg='green.500' borderRadius='md' p={7} color='white'><SlEmotsmile size='24px' /> xx% Low risk</Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box align='center' bg='red.500' borderRadius='md' p={7} color='white'><FiAlertTriangle size='24px' /> xx% High risk</Box>
                      </GridItem>
                    </Grid>
                  </CardBody>
                  <CardFooter>
                    {/* Insert Footer if any */}
                  </CardFooter>
                </Card>
              </Grid>
              <br></br>
              <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(4, 1fr)'
                gap={4}
              >
                <GridItem colSpan={2}>
                  <Card>
                    <CardHeader>
                      <ImManWoman size='20px' />
                    </CardHeader>
                    <CardBody>
                      <Doughnut data={gender} options={{ maintainAspectRatio: false }} />
                    </CardBody>
                    <CardFooter>
                      {/* Insert Footer if any */}
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem colSpan={2}>
                  <Card>
                    <CardHeader>
                      <BiWorld size='24px' />
                    </CardHeader>
                    <CardBody>
                      <Pie data={country} options={{ maintainAspectRatio: false }} />
                    </CardBody>
                    <CardFooter>
                      {/* Insert Footer if any */}
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem colSpan={4}>
                  <Card>
                    <CardHeader>
                      <Heading size='md'> Predictive analysis</Heading>
                    </CardHeader>
                    <CardBody>
                      <Line data={riskdata} options={{ maintainAspectRatio: false }} />
                    </CardBody>
                    <CardFooter>
                      {/* Insert Footer if any */}
                    </CardFooter>
                  </Card>
                </GridItem>
              </Grid>
            </TabPanel>

            {/* Patient data Tab */}
            <TabPanel id='patient-data'>
              <Card>
                <CardHeader>
                  <Heading size='md'> Filter</Heading>
                </CardHeader>
                <CardBody>
                  <FormControl>
                    <Grid
                      templateRows='repeat(2, 1fr)'
                      templateColumns='repeat(6, 1fr)'
                      gap={4}
                    >
                      <GridItem colSpan={2}>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Enter name' />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <FormLabel>Age</FormLabel>
                        <Select placeholder='Select age range'>
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
                        <Select placeholder='Select gender'>
                          <option>Male</option>
                          <option>Female</option>
                        </Select>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <FormLabel>External</FormLabel>
                        <Select placeholder='Select options'>
                          <option>Air Pollution</option>
                          <option>Occupational Hazards</option>
                        </Select>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <FormLabel>Internal</FormLabel>
                        <Select placeholder='Select options'>
                          <option>Alcohol Use</option>
                          <option>Balanced Diet</option>
                          <option>Chronic Lung Desease</option>
                          <option>Dust Allergy</option>
                          <option>Genetic Risk</option>
                          <option>Obesity</option>
                          <option>Active Smoking</option>
                          <option>Passive Smoking</option>
                        </Select>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <FormLabel>Risk Level</FormLabel>
                        <Select placeholder='Select level'>
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </Select>
                      </GridItem>
                    </Grid>
                  </FormControl>
                </CardBody>
                <CardFooter>
                  {/* Insert Footer if any */}
                </CardFooter>
              </Card>
              <br></br>
              <Card>
                <DataTable
                  columns={columns}
                  data={data}
                  keyField="key" />
              </Card>
            </TabPanel>

            {/* SQL Editor Tab */}
            <TabPanel id='sql-editor'>
              <Box>
                <textarea
                  style={{ width: "100%", height: "100%" }}
                  placeholder="Enter SQL Query"
                ></textarea>
              </Box>
              <Button colorScheme="teal" variant="outline">
                Run Query
              </Button>
              <Card>
                <CardHeader>
                  <Heading size='md'> Result</Heading>
                </CardHeader>
                <CardBody>
                  {/* TODO */}
                </CardBody>
                <CardFooter>
                  {/* Insert Footer if any */}
                </CardFooter>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default AdminDashboard;
