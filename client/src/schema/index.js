import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string().required("Kullanıcı adınızı giriniz").min(3).max(30),
  password: Yup.string().required("Şifrenizi giriniz").min(6),
});

export const RegisterSchema = Yup.object({
  email: Yup.string().email("Geçersiz email").required("Email giriniz"),
  password: Yup.string()
    .required("Şifrenizi giriniz")
    .min(6, "Şifre minimum 6 karakter olmalıdır"),
  passwordConfirm: Yup.string()
    .required("Şifre tekrarı giriniz")
    .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor")
    .min(6, "Şifre tekrarı minimum 6 karakter olmalıdır"),
});

export const UserDetailedAfterRegisterSchema = Yup.object({
  birthDate: Yup.date().required("Doğum tarihinizi giriniz"),
  gender: Yup.number(),
  name: Yup.string()
    .required("İsim giriniz")
    .min(2, "İsim minimum 2 karakter olmalıdır"),
  surname: Yup.string()
    .required("Soy isim giriniz")
    .min(2, "Soy isim minimum 2 karakter olmalıdır"),
});

export const AddDiscussionSchema = Yup.object({
  header: Yup.string()
    .required("Başlığı giriniz")
    .min(10, "Başlık minimum 10 karakter olmalıdır"),
  description: Yup.string()
    .required("Açıklama giriniz")
    .min(10, "Açıklama minimum 10 karakter olmalıdır"),
  selectedFilm: Yup.number().moreThan(0, "Film seçiniz"),
});

export const AddCommentSchema = Yup.object({
  content: Yup.string()
    .required("Yorum giriniz")
    .min(10, "Yorum minimum 10 karakter olmalıdır"),
});

export const AddReviewSchema = Yup.object({
  content: Yup.string()
    .required("İçerik giriniz")
    .min(10, "İçerik minimum 10 karakter olmalıdır"),
});


