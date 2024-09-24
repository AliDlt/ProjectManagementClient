import dayjs from "dayjs";

export const maskPhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 11) {
    return phoneNumber.replace(/(\d{4})(\d{4})(\d{3})/, "$1****$3");
  }
  return phoneNumber;
};

export const convertToInternational = (phone) => {
  if (phone.startsWith("0")) {
    return "+98" + phone.slice(1);
  }
  return phone;
};

export const userRol = (rol) => {
  switch (rol) {
    case 0:
      return "مدیر کل";
    case 1:
      return "سر پرست پروژه";
    case 2:
      return "ناظر پروژه";
    case 3:
      return "پذیرش";
  }
};

export function convertDate(dateString) {
  const date = dayjs(dateString);

  const jalaliDate = date.format("YYYY/MM/DD");
  const time = date.format("HH:mm");

  return ` ${time} - ${jalaliDate} `;
}

export const convertFromInternational = (phone) => {
  return "0" + phone.slice(3);
};

export const convertToLocalDate = (date) => {
  return new Date(date).toLocaleDateString("fa", {
    numberingSystem: "latn",
  });
};

export const filterFile = (files, type) => {
  if (type === "gallery") {
    return files?.filter(
      (file) => file.fileFormat === "image" || file.fileFormat === "video",
    );
  } else {
    return files?.filter(
      (file) => file.fileFormat !== "image" && file.fileFormat !== "video",
    );
  }
};

export const getFileFormat = (file) => {
  const index = file.lastIndexOf(".");
  const fileFormat = file.substring(index + 1);
  return fileFormat;
};

export function convertMillisecondsToDate(milliseconds) {
  const date = new Date(milliseconds);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export const imageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/svg+xml",
  "image/tiff",
  "image/x-icon",
];

export const videoFormats = [
  "video/mp4",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-msvideo",
  "video/x-flv",
  "video/x-matroska",
  "video/webm",
  "video/mpeg",
  "video/3gpp",
  "video/x-m4v",
  "video/ogg",
  "application/mxf",
  "video/mp2t",
  "video/x-f4v",
  "video/dvd",
];

export const getTime = (time) => {
  const newTime = new Date(time);
  const hour = newTime.getHours();
  const min = newTime.getMinutes();
  return `  ${hour}:${min} `;
};
