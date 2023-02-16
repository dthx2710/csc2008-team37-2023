import Head from "next/head";
import { Inter } from "@next/font/google";
import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lung Cancer Risk Assessment</title>
        <meta name="description" content="CSC2008 Team37" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p="4">
      <Flex align="center">
        <Spacer />
        <Button as={Link} href="/login" size="sm">
          Admin Login
        </Button>
      </Flex>
      <Flex h="80vh" align="center" justify="center">
        <Box textAlign="center">
          <Heading size="lg" mb="4" color="gray.700">
            Lung Cancer Risk Assessment
          </Heading>
          <Button as={Link} href="/form" colorScheme="blue" size="lg">
            Start Survey
          </Button>
        </Box>
      </Flex>
    </Box>
    </>
  );
}
