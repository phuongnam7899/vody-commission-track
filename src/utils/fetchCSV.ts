import axios from "axios";
import { parseCSV } from "./parseCSV";

export const fetchCSVData = async (csvUrl: string): Promise<any> => {
    const rawData = await axios.get(csvUrl);
    return parseCSV(rawData.data);
  };