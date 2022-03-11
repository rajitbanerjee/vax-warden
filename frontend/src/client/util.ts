export const formatDate = (date: Date, concise?: boolean) => {
  const res = new Date(date).toUTCString().split("00:")[0];
  return concise ? res.split(":00")[0] : res;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
