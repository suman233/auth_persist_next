import {
  forgetPassword,
  otpVerifyFunc,
  passwordReset
} from "@/api/functions/user.api";
import validationText from "@/json/messages/validationText";
import { emailRegex } from "@/lib/functions/_helpers.lib";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

export const forgetPasswordSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format)
  })
  .required();

export const resetPasswordSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),
    password: yup.string().required(validationText.error.enter_password),
    confirm_password: yup.string().required(validationText.error.enter_password)
  })
  .required();

export type ResetSchema = yup.InferType<typeof resetPasswordSchema>;

export type ForgetPasswordSchemaType = yup.InferType<
  typeof forgetPasswordSchema
>;

export const OtpSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),
    otp: yup.string()
  })
  .required();

export type OtpSchemaType = yup.InferType<typeof OtpSchema>;

const ForgetPassword = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    mode: "all",
    defaultValues: {
      email: ""
    }
  });

  const { mutate } = useMutation({
    mutationFn: forgetPassword
  });

  const [isGetOTP, setIsGetOTP] = useState(false);
  const [mail, setMail] = useState("");
  const handleForgetPassword = (data: ForgetPasswordSchemaType) => {
    console.log("forget", data);

    mutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === 200) {
            toast.success(response?.data?.message);
            // router.push("/auth/login");
            setIsGetOTP(true);
            setMail(response?.data?.data?.email as string);
          }
        }
      }
    );
  };

  const [verifyOtp, setVerifyOtp] = useState(false);
  const { register: OtpRegister, handleSubmit: OtpVerifier } = useForm({
    resolver: yupResolver(OtpSchema),
    mode: "all",
    defaultValues: {
      email: "",
      otp: ""
    }
  });

  const { mutate: OtpMutate } = useMutation({
    mutationFn: otpVerifyFunc
  });

  const handleOtp = (data: OtpSchemaType) => {
    OtpMutate(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === 200) {
            toast.success(response?.data?.message);
            setVerifyOtp(true);
          }
        }
      }
    );
  };

  const { register: resetRegister, handleSubmit: ResetSubmit } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirm_password: ""
    }
  });

  const { mutate: passReset } = useMutation({
    mutationFn: passwordReset
  });

  const handlePasswordReset = (data: ResetSchema) => {
    console.log("reset", data);

    passReset(
      { ...data },
      {
        onSuccess: (response) => {
          if (response?.data?.status === 200) {
            toast.success(response?.data?.message);
            router.push("/auth/login");
          }
        },
        onError: (resp) => {
          toast.error(resp.message);
        }
      }
    );
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Box width="50%" margin="auto">
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={{ fontWeight: "bold", color: "black" }}
        >
          Reset Your Password
        </Typography>
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}>
          <LockOutlinedIcon />
        </Avatar> */}
        {!isGetOTP ? (
          <>
            <form
              onSubmit={handleSubmit(handleForgetPassword)}
              style={{ marginTop: "20px" }}
            >
              <InputFieldCommon
                required
                type="email"
                label="Email"
                sx={{
                  my: 1
                }}
                {...register("email")}
              />
              <CustomButtonPrimary
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  margin: "auto",
                  mt: 2
                }}
              >
                <Typography>Send OTP</Typography>
              </CustomButtonPrimary>
            </form>
          </>
        ) : !verifyOtp ? (
          <>
            <form onSubmit={OtpVerifier(handleOtp)}>
              <InputFieldCommon
                required
                type="text"
                value={mail}
                aria-readonly
                sx={{
                  my: 1
                }}
                {...OtpRegister("email")}
              />
              <InputFieldCommon
                required
                type="text"
                label="OTP"
                sx={{
                  my: 1
                }}
                {...OtpRegister("otp")}
              />
              <CustomButtonPrimary
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  margin: "auto"
                }}
              >
                <Typography>Verify OTP</Typography>
              </CustomButtonPrimary>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={ResetSubmit(handlePasswordReset)}>
              <InputFieldCommon
                required
                type="text"
                value={mail}
                aria-readonly
                sx={{
                  my: 1
                }}
                {...resetRegister("email")}
              />
              <InputFieldCommon
                required
                type="password"
                label="Password"
                sx={{
                  my: 1
                }}
                {...resetRegister("password")}
              />
              <InputFieldCommon
                required
                type="password"
                label="Confirm Password"
                sx={{
                  my: 1
                }}
                {...resetRegister("confirm_password")}
              />
              <CustomButtonPrimary
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  margin: "auto"
                }}
              >
                <Typography>Reset Password</Typography>
              </CustomButtonPrimary>
            </form>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ForgetPassword;
