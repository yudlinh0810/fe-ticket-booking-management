const formatType = [
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "YYYY/MM/DD",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YYYY-MM-DD",
];

export const dateTimeTransform = (
  dateString: string | undefined,
  format: string = "DD/MM/YYYY"
) => {
  if (!dateString) return "Invalid date";
  if (!formatType.includes(format)) return "Invalid format";

  const [datePart, timePart] = dateString.trim().split(" ");
  const dateParts = datePart.split("-");

  if (dateParts.length !== 3) return "Invalid date format";

  const [year, month, day] = dateParts;
  const time = timePart || "";

  switch (format) {
    case "DD/MM/YYYY":
      return `${day}/${month}/${year} ${time === "" ? "" : time}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year} ${time === "" ? "" : time}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day} ${time === "" ? "" : time}`;
    case "DD-MM-YYYY":
      return `${day}-${month}-${year} ${time === "" ? "" : time}`;
    case "MM-DD-YYYY":
      return `${month}-${day}-${year} ${time === "" ? "" : time}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day} ${time === "" ? "" : time}`;
    default:
      return "Invalid format";
  }
};
