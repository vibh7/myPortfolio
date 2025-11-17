/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type: 'short', 'long', 'full'
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "long") => {
  if (!date) return "";

  const dateObj = new Date(date);

  const options = {
    short: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
  };

  return dateObj.toLocaleDateString("en-US", options[format] || options.long);
};

/**
 * Format date relative to now (e.g., "2 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative date string
 */
export const formatDateRelative = (date) => {
  if (!date) return "";

  const dateObj = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now - dateObj) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
};
