import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SimulatedPractice from "./pages/SimulatedPractice";
import CompetitionRound from "./pages/CompetitionRound";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="p-4 bg-blue-600 text-white flex justify-around font-semibold">
          <Link to="/">Practice</Link>
          <Link to="/competition">Competition</Link>
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<SimulatedPractice />} />
            <Route path="/competition" element={<CompetitionRound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
