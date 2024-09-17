import * as Yup from "yup";

// Signup Schema
export const signupSchema = Yup.object({
  name: Yup.string()
    .required("این فیلد اجباری است.")
    .max(25, "حد اکثر 25 کاراکتر لازم است")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  surName: Yup.string()
    .required("این فیلد اجباری است.")
    .max(25, "حد اکثر 25 کاراکتر لازم است")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  phoneNumber: Yup.string()
    .required("این فیلد اجباری است.")
    .matches(/^((\+98|0)9\d{9})$/, "لطفا شماره تلفن معتبر وارد کنید"),
  username: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, " نام کاربری باید حداقل 5 کاراکتر باشد")
    .max(25, "حداکثر 25 کاراکتر لازم است")
    .matches(
      /^[a-zA-Z]{1,}\d*$/,
      "نام کاربری باید انگلیسی باشد و با حروف آغاز شود",
    ),
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, "رمز عبور باید حداقل 5 کاراکتر باشد"),
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
    .min(5, "حداقل 5 کاراکتر وارد کنید")
    .max(25, "حداکثر 25 کاراکتر لازم است"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "رمز عبور مطابقت ندارد .",
  ),
});

export const textAria = Yup.object({
  text: Yup.string(),
});
export const messageSchema = Yup.object({
  messageText: Yup.string()
    .required("پیغام نمیتونه خالی باشه .")
    .min(3, "حداقل 3 کاراکتر وارد کنید"),
});

// Project Info Schema
export const projectInfoSchema = Yup.object({
  progress: Yup.string().matches(/^(?:100|[1-9][0-9]?|0)$/),
});

export const changeDataSchema = Yup.object({
  name: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حد اقل 3 کاراکتر وارد کنید")
    .max(25, "حد اکثر 25 کاراکتر وارد کنید")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),

  username: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حد اقل 3 کاراکتر وارد کنید")
    .max(25, "حد اکثر 25 کاراکتر وارد کنید")

    .matches(
      /^[a-zA-Z]{1,}\d*$/,
      "نام کاربری باید انگلیسی باشد و با حروف آغاز شود",
    ),
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حد اقل 3 کاراکتر وارد کنید")

    .max(25, "حد اکثر 25 کاراکتر وارد کنید"),
});

export const addUserSchema = Yup.object({
  name: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حد اقل 3 کاراکتر وارد کنید")

    .max(25, "حد اکثر 25 کاراکتر وارد کنید")
    .matches(/[\u0600-\u06FF]/, "لطفا فارسی وارد کنید"),
  phoneNumber: Yup.string()
    .required("این فیلد اجباری است.")
    .matches(/^((\+98|0)9\d{9})$/, "لطفا شماره تلفن معتبر وارد کنید"),
  username: Yup.string()
    .required("این فیلد اجباری است.")
    .min(3, "حد اقل 3 کاراکتر وارد کنید")

    .max(25, "حداکثر 25 کاراکتر وارد کنید")
    .matches(
      /^[a-zA-Z]{1,}\d*$/,
      "نام کاربری باید انگلیسی باشد و با حروف آغاز شود",
    ),
  password: Yup.string()
    .required("این فیلد اجباری است.")
    .min(5, "حد اقل 5 کاراکتر وارد کنید")
    .max(25, "حداکثر 25 کاراکتر وارد کنید"),
  nationalCode: Yup.string().matches(
    /^(?!(\d)\1{9})\d{10}$/,
    "کد ملی باید 10 رقمی باشد",
  ),
  userRole: Yup.number().required("این فیلد اجباری است "),
});

export const addReportSchema = Yup.object({
  name: Yup.string()
    .min(3, " طول عنوان گزارش باید حداقل 3 کاراکتر باشد ")
    .required("این فیلد اجباری است."),
  description: Yup.string().required("این فیلد اجباری است."),
  project: Yup.object().required("یک پروژه برای گزارش انتخاب کنید"),
  createAt: Yup.string().required(""),
  hour: Yup.string().required(""),
  min: Yup.string().required(""),
});

export const addTicket = Yup.object({
  name: Yup.string()
    .min(3, "حد اقل 3 کارکتر وارد کنید")
    .required("این فیلد اجباری است."),
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
    .min(5, "حد اقل 5 کاراکتر لازم است")
    .max(25, "حداکثر 25 کاراکتر میتوانید وارد کنید"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "با رمز عبور مطابقت ندارد.",
  ),
  otpCode: Yup.string()
    .required("کد اعتبار سنجی اجباری است")
    .max(4, "کد اعتبار سنجی 4 رقمی میباشد")
    .min(4, "کد اعتبار سنجی 4 رقمی میباشد"),
});

// Add Applicant
export const applicant = Yup.object({
  firstName: Yup.string().required("این فیلد اجباری است."),
  lastName: Yup.string().required("این فیلد اجباری است."),
  postalCode: Yup.string().matches(
    /^[0-9]{10}$/,
    "لطفا کد پستی معتبر وارد کنید",
  ),
  nationalCode: Yup.string().matches(
    /^(?!(\d)\1{9})\d{10}$/,
    "کد ملی باید 10 رقمی باشد",
  ),
  phoneNumber: Yup.string().matches(
    /^((\+98|0)9\d{9})$/,
    "لطفا شماره تلفن معتبر وارد کنید",
  ),
});
