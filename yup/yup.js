import * as Yup from "yup";

// Signup Schema
export const signupSchema = Yup.object({
  name: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حداقل کارکتر : 3")
    .max(25, "حداکثر کارکتر : 25")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  phonenumber: Yup.string()
    .required("این فیلد اجباری است.")
    .matches(
      /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
      "لطفا شماره تماس نامعتبر است",
    ),
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
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, "حداقل کارکتر : 5")
    .max(25, "حداکثر کارکتر : 25"),
});
