interface Data {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface LinePoint {
  payload: Data;
  value: [number, number];
  x: number;
  y: number;
}

export { Data, LinePoint };
