import * as Yup from "yup";

// Signup Schema
export const signupSchema = Yup.object({
  name: Yup.string()
    .required("این فیلد اجباری است.")
    .max(25, "حداکثر کارکتر : 25")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  surName: Yup.string()
    .required("این فیلد اجباری است.")
    .max(25, "حداکثر کارکتر : 25")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  phoneNumber: Yup.string()
    .required("این فیلد اجباری است.")
    .matches(/^((\+98|0)9\d{9})$/, "لطفا شماره تلفن معتبر وارد کنید"),
  username: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, " نام کاربری باید حداقل 5 کارکتر باشد")
    .max(25, "حداکثر کارکتر : 25")
    .matches(
      /^[a-zA-Z]{1,}\d*$/,
      "نام کاربری باید انگلیسی باشد و با حروف آغاز شود",
    ),
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, "رمز عبور باید حداقل 5 کارکتر باشد"),
  passwordConfirmation: Yup.string()
    .required("این فیلد اجباری است.")
    .oneOf([Yup.ref("password"), null], "با رمز عبور مطابقت ندارد."),
  isForeign: Yup.boolean(),
  nationalCode: Yup.string().when("isForeign", {
    is: false,
    then: (schema) =>
      schema
        .required("این فیلد اجباری است.")
        .matches(/^(?!(\d)\1{9})\d{10}$/, "کد ملی باید 10 رقمی باشد"),
  }),
  userRole: Yup.string().required("این فیلد اجباری است."),
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

export const textAria = Yup.object({
  text: Yup.string(),
});
export const messageSchema = Yup.object({
  messageText: Yup.string()
    .required("پیغام نمیتونه خالی باشه .")
    .min(5, "حداقل کارکتر : 5"),
});

// Project Info Schema
export const projectInfoSchema = Yup.object({
  progress: Yup.string().matches(/^(?:100|[1-9][0-9]?|0)$/),
});

export const changeDataSchema = Yup.object({
  name: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حداقل کارکتر : 3")
    .max(25, "حداکثر کارکتر : 25")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),

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

export const addUserSchema = Yup.object({
  name: Yup.string()
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
  nationalCode: Yup.string().matches(
    /^(?!(\d)\1{9})\d{10}$/,
    "کد ملی باید 10 رقمی باشد",
  ),
  userRole: Yup.number().required("این فیلد اجباری است "),
});

export const addReportSchema = Yup.object({
  name: Yup.string().min(3, "حد اقل 3 کارکتر").required("این فیلد اجباری است."),
  description: Yup.string().required("این فیلد اجباری است."),
  project: Yup.object().required("یک پروژه برای گزارش انتخاب کنید"),
});

export const addTicket = Yup.object({
  name: Yup.string().min(3, "حد اقل 3 کارکتر").required("این فیلد اجباری است."),
  content: Yup.string().required("این فیلد اجباری است."),
  assignedTo: Yup.object().required("یک کاربر را انتخاب کنید"),
});

// New Project Schema
export const addNewProjectSchema = Yup.object({
  name: Yup.string().required(""),
  description: Yup.string().required("این فیلد اجباری است"),
  startDate: Yup.string().required(""),
  endDate: Yup.string().required(""),
  address: Yup.string().required(""),
  longitude: Yup.number().required(""),
  latitude: Yup.number().required(""),
  progress: Yup.string().matches(/^(?:100|[1-9][0-9]?|0)$/),
});

export const changePassword = Yup.object({
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, "حد اقل 5 کارکتر لازم است")
    .max(25, "حداکثر 25 کارکتر میتوانید وارد کنید"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "با رمز عبور مطابقت ندارد.",
  ),
  otpCode: Yup.string()
    .required("کد اعتبار سنجی اجباری است")
    .max(4, "کد اعتبار سنجی 4 رقمی میباشد")
    .min(4, "کد اعتبار سنجی 4 رقمی میباشد"),
});
