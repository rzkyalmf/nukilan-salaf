const formatDate = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDay = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
  return days[date.getDay()];
};

export { formatDate, formatDay, formatTime };
