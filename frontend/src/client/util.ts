export const formatDate = (date: Date) => {
  return new Date(date).toUTCString().split("00:")[0];
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
