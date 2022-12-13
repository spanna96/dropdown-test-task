import React from "react";
import { LanguageDropdown } from "../LanguageDropdown";

import "./App.css";

const initialValues = [
  { id: 1, name: "Арабский", description: "العربية" },
  { id: 4, name: "Bosnian", description: "Bosnian" },
  { id: 8, name: "Датский", description: "Dansk" },
  { id: 11, name: "Английский", description: "English" },
];

function App() {
  return (
    <div className="App">
      <div className="LanguageDropdown-block">
        <LanguageDropdown initialValues={initialValues}/>
      </div>

      <div className="LanguageDropdown-block">
        <LanguageDropdown />
      </div>
    </div>
  );
}

export default App;
