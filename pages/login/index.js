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
import { useRouter } from 'next/router'
import Head from "next/head";
import { signIn } from "next-auth/react"
import { useState } from "react";
function Login() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const [pageState, setPageState] = useState({ error: "", processing: false })
  const handleFieldChange = (e) => {
    setAuthState(old => ({ ...old, [e.target.id]: e.target.value }))
  }
  const simplifyError = (error) => {
    const errorMap = {
      "CredentialsSignin": "Invalid username or password"
    }
    return errorMap[error] ?? "Unknown error occurred"
  }
  const handleSubmit = async (e) => {
    // validate
    e.preventDefault()
    setPageState(old => ({ ...old, processing: true, error: '' }))

    const res = await signIn("credentials", { username: userInfo.username, password: userInfo.password, redirect: false })
    console.log(res)
    if (res.ok) {
      // Authenticate user
      router.push("/admin")
    }
    else {
      setPageState(old => ({ ...old, error: res.error }))
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
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1rem" }}>
                <h1 style={{ marginBottom: "0.5rem" }}>Username</h1>
                <input
                  value={userInfo.username}
                  type="text"
                  placeholder=""
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, username: target.value })
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
              {
                pageState.error !== '' && <label>{simplifyError(pageState.error)}</label>
              }
              <input type="submit" value="Login" style={{ backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", padding: "0.5rem 1rem", cursor: "pointer" }} />
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
