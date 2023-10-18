import React, { useState } from "react";

export default function Header({ toggleDarkMode, isDarkMode }) {
  // The toggleDarkMode function received as a prop

  const handleToggleDarkMode = () => {
    toggleDarkMode(); // Call the function passed as a prop
    // You can also add logic to save the dark mode preference to localStorage or cookies here
  };

  return (
    <header>
      <h1>Where in the World?</h1>
      <button
        onClick={handleToggleDarkMode}
        style={isDarkMode ? { color: "white" } : {}}
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}
