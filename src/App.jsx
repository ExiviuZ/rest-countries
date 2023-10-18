// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Country from "./pages/country";
import Home from "./pages/home";
import "./styles/App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appClassName = isDarkMode ? "clr-control dark-mode" : "clr-control";

  return (
    <div className={appClassName}>
      <BrowserRouter>
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/country/:countryName" element={<Country />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
