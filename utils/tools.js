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
      return "ادمین";
    case 1:
      return "پیمانکار";
    case 2:
      return "ناظر";
  }
};

export const convertFromInternational = (phone) => {
  return "0" + phone.slice(3);
};

export const convertToLocalDate = (date) => {
  return new Date(date).toLocaleDateString("fa", {
    numberingSystem: "latn",
  });
};
