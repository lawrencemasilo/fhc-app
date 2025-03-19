import React, { useState} from "react";
import { competitionData } from "../data/competitionData";

export const CompetitionList = () => {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const filteredCompetitions = competitionData.filter((competition) => {
    return (
      (category === "" || competition.category === category) &&
      (startDate === "" || new Date(competition.start_date) >= new Date(startDate))
    );
  });

  const handleEnterCompetition = () => {
    alert(`You have successfully entered the competition: ${selectedCompetition.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-5 bg-white flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-1/4 bg-gray-100 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
        <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(competitionData.map((c) => c.category))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <label className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </aside>

      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Competitions</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompetitions.map((competition, index) => (
            <li
              key={index}
              className="bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              onClick={() => setSelectedCompetition(competition)}
            >
              <img
                src={competition.image}
                alt={competition.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{competition.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{competition.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <p className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
                  {competition.category}
                </p>
                <p className="text-gray-600">{competition.start_date}</p>
              </div>
              <button
                onClick={handleEnterCompetition}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Enter Competition
              </button>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
};