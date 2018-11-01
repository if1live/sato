export interface CodecData {
  // sample: "opus"
  audio: string;
  // sample
  // "opus"
  // "48000 Hz"
  // "stereo"
  // "fltp (default)"
  audio_details: string[];
  // sample: "00:03:51.46"
  duration: string;
  // sample: "matroska,webm"
  format: string;
}
