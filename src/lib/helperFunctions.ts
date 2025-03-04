export function formatToCurrency(amount: number | string) {
  if (!Number(amount)) return "--";

  return `₦${amount.toLocaleString("en-NG")}`;
}

export function friendlyTime(timestamp: string): string {
  const date: Date = new Date(timestamp);

  // Validate the date
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now: Date = new Date();
  let diff: number = (now.getTime() - date.getTime()) / 1000; // difference in seconds

  // If the event is in the future, treat it as "Just now"
  if (diff < 0) {
    diff = 0;
  }

  if (diff < 60) {
    return "Just now";
  } else if (diff < 3600) {
    const mins: number = Math.floor(diff / 60);
    return `${mins} ${mins === 1 ? "min" : "mins"} ago`;
  } else if (diff < 86400) {
    const hours: number = Math.floor(diff / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    // For dates older than a day, format as "D MMM YY" (e.g., "24 Feb 24")
    const day: number = date.getDate();
    const months: string[] = [
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
    const month: string = months[date.getMonth()];
    const year: string = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
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
