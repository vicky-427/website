import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Landing"; 
import Main from "./components/main"; 
import File from "./components/filemanager";
import Dash from "./components/dashboard";
import Form from "./components/form";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/file" element={<File />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;
