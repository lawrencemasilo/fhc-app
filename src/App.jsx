import React from "react";
import './App.css'
import { CompetitionList } from "./components/CompetitionList";

function App() {

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <CompetitionList />
    </div>
  )
}

export default App
