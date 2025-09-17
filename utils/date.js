function isValidTime(time) {
  // Check if time is in HH:MM:SS format and is a valid time
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return timeRegex.test(time);
}

function isValidDate(date) {
  // Check if date is in YYYY-MM-DD format and is a valid date
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(date)) return false;
  const [year, month, day] = date.split('-').map(Number);
  const dt = new Date(year, month - 1, day);
  return dt.getFullYear() === year && dt.getMonth() === month - 1 && dt.getDate() === day;
}

module.exports = {
  isValidTime,
  isValidDate,
};