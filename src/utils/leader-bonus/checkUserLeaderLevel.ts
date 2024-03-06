const isMeetMinimumDirectRevenue = (userStat: any, value: number) => {
  return userStat.directRevenue >= value;
};
const isMeetMinimumBranchRevenue = (userStat: any, value: number) => {
  return userStat.branchRevenue >= value;
};
const isMeetTop3BranchRevenue = (userStat: any, value: number) => {
  return userStat.userTop3DirectChildren[2].branchRevenue >= value;
};

const topBranchMeetMinimumLevel = (
  userLeaderStats: any,
  userStat: any,
  childNumber: number,
  levelToCheck: number
) => {
  return (
    checkUserLeaderLevel(
      userLeaderStats,
      userStat.userTop3DirectChildren[childNumber].username
    ) >= levelToCheck
  );
};

export const checkUserLeaderLevel = (
  userLeaderStats: any,
  usernameToCheck: string
) => {
  const userStat = userLeaderStats[usernameToCheck];
  let leaderLevel = 0;
  //   lv1
  if (
    isMeetMinimumDirectRevenue(userStat, 100000000) &&
    isMeetMinimumBranchRevenue(userStat, 2000000000) &&
    isMeetTop3BranchRevenue(userStat, 400000000)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  //   lv2

  if (
    isMeetMinimumDirectRevenue(userStat, 200000000) &&
    isMeetTop3BranchRevenue(userStat, 1000000000) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 0, 1) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 1, 1)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  //   lv3
  if (
    isMeetMinimumDirectRevenue(userStat, 400000000) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 0, 2) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 1, 2)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  //   lv4
  if (
    isMeetMinimumDirectRevenue(userStat, 600000000) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 0, 3) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 1, 3) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 2, 2)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  //   lv5
  if (
    isMeetMinimumDirectRevenue(userStat, 1000000000) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 0, 4) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 1, 4) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 2, 3) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 3, 3)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  //   lv6
  if (
    isMeetMinimumDirectRevenue(userStat, 2000000000) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 0, 5) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 1, 5) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 2, 4) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 3, 4)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  //   lv7
  if (
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 0, 6) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 1, 6) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 2, 5) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 3, 5)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  //   lv8
  if (
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 0, 7) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 1, 7) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 2, 6) &&
    topBranchMeetMinimumLevel(userLeaderStats, userStat, 3, 6)
  ) {
    leaderLevel++;
  } else return leaderLevel;
  return leaderLevel;
};
