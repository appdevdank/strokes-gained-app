// Simplified strokes gained data table (feet: expected strokes)
const strokesGainedTable = {
  1: 1.00, 2: 1.10, 3: 1.15, 4: 1.18, 5: 1.21, 6: 1.23, 7: 1.25,
  8: 1.27, 9: 1.29, 10: 1.30, 12: 1.34, 15: 1.38, 20: 1.43,
  25: 1.48, 30: 1.53, 40: 1.60, 50: 1.68, 60: 1.75
};

// Interpolates expected strokes for non-listed distances
export function getExpectedStrokes(feet) {
  if (feet <= 1) return 1.0;
  const keys = Object.keys(strokesGainedTable).map(Number);
  for (let i = 0; i < keys.length - 1; i++) {
    if (feet >= keys[i] && feet <= keys[i+1]) {
      const x1 = keys[i], x2 = keys[i+1];
      const y1 = strokesGainedTable[x1], y2 = strokesGainedTable[x2];
      const ratio = (feet - x1) / (x2 - x1);
      return y1 + ratio * (y2 - y1);
    }
  }
  return 1.75; // max cap
}

export function calculateStrokesGained(startFeet, puttsTaken) {
  const expected = getExpectedStrokes(startFeet);
  return +(expected - puttsTaken).toFixed(2);
}
