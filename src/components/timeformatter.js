export function beautifyTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
  
    // Calculate the time difference in milliseconds
    const timeDifference = now - time;
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  
    if (timeDifferenceInDays === 0) {
      if (timeDifferenceInHours < 1) {
        return `${timeDifferenceInMinutes} mins ago`;
      } else if (timeDifferenceInHours < 12) {
        return `${timeDifferenceInHours} hours ago`;
      } else {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    } else if (timeDifferenceInDays === 1) {
      return 'Yesterday';
    } else {
      return time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
    }
  }
  