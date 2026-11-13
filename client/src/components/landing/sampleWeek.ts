type Day = { name: string; duration: string; isToday?: boolean };

export const week: Day[] = [
  { name: "Mon", duration: "20 min" },
  { name: "Tue", duration: "4h" },
  { name: "Wed", duration: "45 min" },
  { name: "Thu", duration: "1h 30m" },
  { name: "Fri", duration: "25 min" },
  { name: "Sat", duration: "2h" },
  { name: "Today", duration: "Still open", isToday: true },
];
