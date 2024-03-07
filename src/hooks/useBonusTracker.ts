import { useState } from "react";
import { fetchCSVData } from "../utils/fetchCSV";
import { sheetsLinks } from "../configs/sheetLinks";
export const useBonusTracker = () => {
  const [bonusTrackers, setBonusTrackers] = useState({});
  const fetchBonusTrackers = async () => {
    const fetchedBonusTrackers = await fetchCSVData(sheetsLinks.bonusTracker);
    const newBonusTrackers: any = {};
    fetchedBonusTrackers.forEach((bonusTracker: any) => {
      newBonusTrackers[bonusTracker["Tên người dùng"]] = {
        m1y2024: bonusTracker["Tháng 1/2024"],
        m4y2024: bonusTracker["Tháng 4/2024"],
        m5y2024: bonusTracker["Tháng 5/2024"],
        m6y2024: bonusTracker["Tháng 6/2024"],
        m7y2024: bonusTracker["Tháng 7/2024"],
        m8y2024: bonusTracker["Tháng 8/2024"],
        m9y2024: bonusTracker["Tháng 9/2024"],
      };
    });
    setBonusTrackers(newBonusTrackers);
  };
  return { bonusTrackers, fetchBonusTrackers };
};
