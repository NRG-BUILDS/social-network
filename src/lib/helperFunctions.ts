import useRequest from "@/hooks/useRequest";

export function formatToCurrency(amount: number | string) {
  if (!Number(amount)) return "--";

  return `₦${amount.toLocaleString("en-NG")}`;
}
export function formatTimestamp(timestamp: null | string): string {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  // Get the ordinal suffix for the day of the month
  const ordinalSuffix = (n: number) => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${dayOfWeek}, ${ordinalSuffix(
    day
  )} ${month} ${year}, ${hours}:${minutes}`;
}
export function timeAgo(timestamp: number | string): string {
  const now = new Date().getTime();
  const past =
    typeof timestamp === "string" ? new Date(timestamp).getTime() : timestamp;
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}
export function convertToFormData(obj: Record<string, any>): FormData {
  let data = Object.keys(obj).reduce((fd, k) => {
    const value =
      typeof obj[k] === "object" && !(obj[k] instanceof File)
        ? JSON.stringify(obj[k])
        : obj[k];
    fd.append(k, value);
    return fd;
  }, new FormData());

  return data;
}

// Creates a thumbnail fitted insize the boundBox (w x h)
export const generateThumbnail = (file: File, boundBox: number[]) => {
  if (!boundBox || boundBox.length != 2) {
    throw "You need to give the boundBox";
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Context not available");
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onload = function () {
      const scaleRatio =
        Math.min(...boundBox) / Math.max(img.width, img.height);
      const w = img.width * scaleRatio;
      const h = img.height * scaleRatio;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      return resolve(canvas.toDataURL(file.type));
    };
    img.src = window.URL.createObjectURL(file);
  });
};
