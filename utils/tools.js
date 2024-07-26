export const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 11) {
      return phoneNumber.replace(/(\d{4})(\d{4})(\d{3})/, '$1****$3');
    }
    return phoneNumber;
  };