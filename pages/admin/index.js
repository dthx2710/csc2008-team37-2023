/* eslint-disable react/jsx-key */
import React from "react";
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

const data = [
  { key: "1", name: "John", age: 30 },
  { key: "2", name: "Jane", age: 25 },
  { key: "3", name: "Bob", age: 40 },
];

const data2 = [
  { key: "1", name: "Test", age: 30 },
  { key: "2", name: "Test2", age: 25 },
  { key: "3", name: "Test3", age: 40 },
];

const columns = [
  { Header: "Key", accessor: "key", sortable: true },
  { Header: "Name", accessor: "name" },
  { Header: "Age", accessor: "age" },
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
            <Tab>Table 1</Tab>
            <Tab>Table 2</Tab>
            <Tab>SQL Editor</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataTable columns={columns} data={data} keyField="key" />
            </TabPanel>
            <TabPanel>
              <DataTable columns={columns} data={data2} keyField="key" />
            </TabPanel>
            <TabPanel>
              <Box>
                <textarea
                  style={{ width: "100%", height: "100%" }}
                  placeholder="Enter SQL Query"
                ></textarea>
              </Box>
              <Button colorScheme="teal" variant="outline">
                Run Query
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default AdminDashboard;
