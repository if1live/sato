/*
{ frames: NaN,
currentFps: NaN,
currentKbps: 1535.9,
targetSize: 2325,
timemark: '00:00:12.40',
percent: 0.12484167005534615 }
*/
export interface Progress {
  frames: number;
  currentFps: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
  percent: number;
}
