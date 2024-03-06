import dayjs from "dayjs";

export type UserLevel = "Collaborator" | "Employee" | "Manager";
export type User = {
  username: string;
  registeredAt: dayjs.Dayjs;
  parent: string | null;
  level: UserLevel;
  claimedLeaderBonus: number;
  claimedGroupRevenueBonus: number;
};
