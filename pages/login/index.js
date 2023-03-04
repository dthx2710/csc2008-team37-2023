import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import { signIn } from "next-auth/react"
import { useState } from "react";
function Login() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const handleSumit = async (e) => {
    // validate
    e.preventDefault()
    const res = await signIn("credentials", { email: userInfo.email, password: userInfo.password, callbackUrl: "/admin" })
    console.log(res)
    if (res.ok) {

    }
  };
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
            <form onSubmit={handleSumit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1rem" }}>
                <h1 style={{ marginBottom: "0.5rem" }}>Email</h1>
                <input
                  value={userInfo.email}
                  type="email"
                  placeholder=""
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, email: target.value })
                  }
                  style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1rem" }}>
                <h1 style={{ marginBottom: "0.5rem" }}>Password</h1>
                <input
                  value={userInfo.password}
                  type="password"
                  placeholder=""
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password: target.value })
                  }
                  style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%" }}
                />
              </label>
              <input type="submit" value="Login" style={{ backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", padding: "0.5rem 1rem", cursor: "pointer" }} />
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
