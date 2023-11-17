// config.js
const FormatDate = (dateString) => {
    const originalDate = new Date(dateString);
    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  export { FormatDate };
  