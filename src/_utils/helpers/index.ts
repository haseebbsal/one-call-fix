export const getTimeAgo = (date: string) => {
    const current: any = new Date();
    const previous: any = new Date(date);
  
    // Calculate difference in milliseconds
    const diff = current - previous;
  
    // Calculate different time units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };
  
  export const toTitleCase = (str: string, separator = " ") => {
    if (!str) {
      return "";
    }
    const sentence = str.toLowerCase().split(separator);
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0]?.toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
  };
  