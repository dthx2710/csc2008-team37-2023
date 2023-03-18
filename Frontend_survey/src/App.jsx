import React from "react";
import { Home, Page_1, Page_2, Page_3, Page_4, Page_5 } from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/part-1" element={<Page_1 />} />
          <Route path="/part-2" element={<Page_2 />} />
          <Route path="/part-3" element={<Page_3 />} />
          <Route path="/part-4" element={<Page_4 />} />
          <Route path="/part-5" element={<Page_5 />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
