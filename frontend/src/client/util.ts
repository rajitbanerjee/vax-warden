export const formatDate = (date: Date, dateOnly?: boolean, concise?: boolean) => {
  const res = new Date(date).toUTCString();
  if (dateOnly) return res.substring(0, res.length - 13);
  if (concise) return res.substring(0, res.length - 7);
  return res;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
