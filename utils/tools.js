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
      return "پیمانکار";
    case 1:
      return "ناظر";
    case 2:
      return "ادمین";
  }
};
