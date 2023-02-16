import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";

function Login() {
  return (
    <>
      <Head>
        <title>Admin Login</title>
        <meta name="description" content="CSC2008 Team37" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex minHeight="100vh" align="center" justify="center">
        <Box
          borderWidth={1}
          px={4}
          width="full"
          maxWidth="500px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
        >
          <Box p={4}>
            <Heading>Admin Login</Heading>
          </Box>
          <Box p={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="Username" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" />
            </FormControl>
            <Button width="full" mt={4} colorScheme="teal">
              Login
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
