import React, { useState } from 'react';
import { calculateStrokesGained } from '../utils/strokesGained';

const simulatedDistances = [2, 4, 6, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 60];

export default function SimulatedPractice() {
  const [holeIndex, setHoleIndex] = useState(0);
  const [putts, setPutts] = useState('');
  const [results, setResults] = useState([]);

  const currentDistance = simulatedDistances[holeIndex];
  const totalSG = results.reduce((a, b) => a + b.strokesGained, 0).toFixed(2);

  const submitPutts = () => {
    const sg = calculateStrokesGained(currentDistance, Number(putts));
    setResults([...results, { hole: holeIndex + 1, distance: currentDistance, putts, strokesGained: sg }]);
    setPutts('');
    setHoleIndex(holeIndex + 1);
  };

  if (holeIndex >= simulatedDistances.length) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Practice Complete</h2>
        <p className="mb-2">Total Strokes Gained: {totalSG}</p>
        <ul className="text-sm">
          {results.map((r, i) => (
            <li key={i}>Hole {r.hole}: {r.distance}ft, {r.putts} putts → SG: {r.strokesGained}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hole {holeIndex + 1}</h2>
      <p className="mb-2">Distance: {currentDistance} feet</p>
      <input
        type="number"
        min="1"
        max="5"
        value={putts}
        onChange={e => setPutts(e.target.value)}
        className="border p-2 rounded mr-2 w-20"
      />
      <button onClick={submitPutts} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}
