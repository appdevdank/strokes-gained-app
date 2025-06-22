import React, { useState } from 'react';
import { calculateStrokesGained } from '../utils/strokesGained';

export default function CompetitionRound() {
  const [hole, setHole] = useState(1);
  const [putts, setPutts] = useState([]);
  const [distance, setDistance] = useState('');
  const [history, setHistory] = useState([]);

  const handleAddPutt = () => {
    if (!distance) return;
    setPutts([...putts, Number(distance)]);
    setDistance('');
  };

  const completeHole = () => {
    const strokesGained = calculateStrokesGained(putts[0], putts.length);
    const entry = {
      hole,
      putts: putts.length,
      distances: [...putts],
      strokesGained,
    };
    setHistory([...history, entry]);
    setHole(hole + 1);
    setPutts([]);
  };

  const totalSG = history.reduce((a, b) => a + b.strokesGained, 0).toFixed(2);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hole {hole}</h2>
      <div className="mb-2">
        <input
          type="number"
          value={distance}
          placeholder="Putt Distance (ft)"
          onChange={(e) => setDistance(e.target.value)}
          className="border p-2 rounded mr-2 w-40"
        />
        <button onClick={handleAddPutt} className="bg-blue-600 text-white px-4 py-2 rounded">Add Putt</button>
      </div>
      <div className="mb-4">
        <p className="text-sm">Putts this hole: {putts.length}</p>
        <p className="text-sm">Distances: {putts.join(', ')}</p>
        {putts.length > 0 && (
          <button onClick={completeHole} className="bg-green-600 text-white px-4 py-2 mt-2 rounded">Complete Hole</button>
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Strokes Gained Summary</h3>
        <ul className="text-sm">
          {history.map((h, i) => (
            <li key={i}>Hole {h.hole}: {h.putts} putts ({h.distances.join(', ')} ft) → SG: {h.strokesGained}</li>
          ))}
        </ul>
        <p className="mt-2 font-bold">Total SG: {totalSG}</p>
      </div>
    </div>
  );
}
