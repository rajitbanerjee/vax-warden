export const formatDate = (date: Date) => {
  return new Date(date).toUTCString().split("00:")[0];
};
