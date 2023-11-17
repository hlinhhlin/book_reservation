// config.js
const FormatDate = (dateString) => {
  const originalDate = new Date(dateString);
  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const year = originalDate.getFullYear();

  return `${day}-${month}-${year}`;
};

// Function to format ISBN with dashes
const FormatISBN = (isbn) => {
  if (!isbn) {
    return ""; // Return an empty string or handle the case when ISBN is not provided
  }

  // Remove any existing dashes from the ISBN
  const cleanedISBN = isbn.replace(/-/g, "");

  // Insert dashes at specific positions for better readability
  const formattedISBN = cleanedISBN.replace(/(\d)(?=(\d{3})+$)/g, "$1-");

  return formattedISBN;
};

export { FormatDate, FormatISBN };
