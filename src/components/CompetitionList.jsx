import React, { useState } from "react";
import { competitionData } from "../../competitionData";
import "../App.css";

export const CompetitionList = () => {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    agreeToTerms: false
  });

  const filteredCompetitions = competitionData.filter((competition) => {
    return (
      (category === "" || competition.category === category) &&
      (startDate === "" || new Date(competition.start_date) >= new Date(startDate))
    );
  });

  const handleEnterCompetition = (e, competition) => {
    e.stopPropagation();
    setSelectedCompetition(competition);
    setShowModal(true);
    setFormData({
      email: "",
      agreeToTerms: false
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const confirmEntry = (e) => {
    e.preventDefault();
    setShowModal(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const isValidForm = formData.email.includes("@") && formData.agreeToTerms;

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
                onClick={(e) => handleEnterCompetition(e, competition)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Enter Competition
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showModal && selectedCompetition && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <img 
                src={selectedCompetition.image} 
                alt={selectedCompetition.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCompetition.name}
                </h2>
                <p className="text-gray-600 text-sm">{selectedCompetition.category}</p>
              </div>
            </div>
            
            <form onSubmit={confirmEntry}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleFormChange}
                    className="mr-2"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the competition terms and conditions
                  </span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!isValidForm}
                  className={`px-4 py-2 rounded-lg text-white transition duration-300 ${
                    isValidForm ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Enter Competition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && selectedCompetition && (
        <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-xl p-4 w-full max-w-sm z-50 border-l-4 border-green-500 animate-slide-in">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Success!</h3>
              <p className="text-gray-600">
                You have successfully entered the competition: {selectedCompetition.name}
              </p>
            </div>
            <button 
              onClick={() => setShowConfirmation(false)}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};