import dayjs from "dayjs";

import { FaFileArchive, FaFileWord } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { MdTextSnippet } from "react-icons/md";

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
      return "مدیر";
    case 1:
      return "ناظر";
    case 2:
      return "پیمانکار";
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

