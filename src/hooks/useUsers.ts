import { useState } from "react";
import { fetchCSVData } from "../utils/fetchCSV";
import { sheetsLinks } from "../configs/sheetLinks";
import dayjs from "dayjs";
import { User, UserLevel } from "../types/users";

const userLevelMap = {
  "Nhân Viên": "Employee",
  CTV: "Collaborator",
  "Quản Lý": "Manager",
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const fetchedUsers = await fetchCSVData(sheetsLinks.users);
    setUsers(
      fetchedUsers.map((user: any): User => {
        return {
          username: user["Tên người dùng"],
          level: userLevelMap[
            user["Chức vụ"] as keyof typeof userLevelMap
          ] as UserLevel,
          parent: user["Người giới thiệu"],
          registeredAt: dayjs(new Date(user["Ngày tham gia"])),
          claimedLeaderBonus: Number(user["Thưởng LĐ Đã Nhận"]),
          claimedGroupRevenueBonus: Number(
            user["Thưởng Doanh Số Nhóm Đã Nhận"]
          ),
        };
      })
    );
  };
  return { users, fetchUsers };
};
