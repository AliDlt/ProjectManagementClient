import * as Yup from "yup";

// Signup Schema
export const signupSchema = Yup.object({
  name: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حداقل کارکتر : 3")
    .max(25, "حداکثر کارکتر : 25")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  surName: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حداقل کارکتر : 3")
    .max(25, "حداکثر کارکتر : 25")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  phoneNumber: Yup.string()
    .required("این فیلد اجباری است.")
    .matches(/^((\+98|0)9\d{9})$/, "لطفا شماره تلفن معتبر وارد کنید"),
  username: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حداقل کارکتر : 3")
    .max(25, "حداکثر کارکتر : 25")
    .matches(
      /^[a-zA-Z]{1,}\d*$/,
      "نام کاربری باید انگلیسی باشد و با حروف آغاز شود",
    ),
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, "حداقل کارکتر : 5")
    .max(25, "حداکثر کارکتر : 25"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "با رمز عبور مطابقت ندارد.",
  ),
  nationalCode: Yup.string().matches(
    /^(?!(\d)\1{9})\d{10}$/,
    "کد ملی باید 10 رقمی باشد",
  ),
});

// Login Schema
export const loginSchema = Yup.object({
  username: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حداقل کارکتر : 3")
    .max(25, "حداکثر کارکتر : 25")
    .matches(
      /^[a-zA-Z]{1,}\d*$/,
      "نام کاربری باید انگلیسی باشد و با حروف آغاز شود",
    ),
  password: Yup.string().required("این فیلد اجباری است."),
});

// Forget Password Schema
export const forgetPasswordSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("این فیلد اجباری است.")
    .matches(/^((\+98|0)9\d{9})$/, "لطفا شماره تلفن معتبر وارد کنید"),
});

// Reset Password Schema
export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, "حداقل کارکتر : 5")
    .max(25, "حداکثر کارکتر : 25"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "با رمز عبور مطابقت ندارد.",
  ),
});

export const messageSchema = Yup.object({
  messageText: Yup.string()
    .required("پیغام نمیتونه خالی باشه .")
    .min(5, "حداقل کارکتر : 5"),
});

// Project Info Schema
export const projectInfoSchema = Yup.object({
  percentage: Yup.string().matches(/^(?:100|[1-9][0-9]?|0)$/),
});
