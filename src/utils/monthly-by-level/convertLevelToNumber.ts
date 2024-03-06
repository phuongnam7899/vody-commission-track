export const convertLevelToNumber = (level: string): number => {
  if (level === "Collaborator") {
    return 1;
  }
  if (level === "Employee") {
    return 2;
  }
  if (level === "Manager") {
    return 3;
  }
  throw new Error(`Invalid level ${level}`);
};
