import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { loginMutation } from "@/api/functions/user.api";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { LFormInput } from "@/interface/common.interface";
import validationText from "@/json/messages/validationText";
import { emailRegex } from "@/lib/functions/_helpers.lib";
import { setAccessToken, setUserData } from "@/reduxtoolkit/slices/userSlice";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const loginschema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),
    password: yup.string().required(validationText.error.enter_password)
    // deviceToken: yup.string().nullable()
  })
  .required();

export type logSchema = yup.InferType<typeof loginschema>;

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LFormInput>({
    resolver: yupResolver(loginschema)
  });

  const { isLoggedIn } = useAppSelector((s) => s.userSlice);

  const { mutate, data } = useMutation({
    mutationFn: loginMutation
  });

  const onSubmit = (data: logSchema) => {
    console.log("logged", data);

    mutate(
      { ...data },
      {
        onSuccess: (resp) => {
          // reset();
          if (resp.data.status === 200) {
            // console.log("signed", data);
            if (resp?.data) {
              const { ...userData } = resp.data;
              toast.success(resp?.data?.message);
              setCookie("token", userData.token);
              setCookie("userdata", userData);
              console.log("Token:-", userData.token);
              dispatch(setAccessToken(userData.token));
              dispatch(setUserData(userData));
              router.push("/profile");
            }
          }
        },
        onError: (err) => {
          if (err) {
            toast.error(err.message);
          }
        }
      }
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn]);

  // if (data?.status === 400) {
  //   toast.error(data.data.message);
  // }
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Login Form
      </Typography>

      <Box
        component={"form"}
        width={"50%"}
        sx={{ margin: "auto" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFieldCommon
          type="email"
          label="Email"
          sx={{ my: 2 }}
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <InputFieldCommon
          type="password"
          label="Password"
          sx={{ mb: 2 }}
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <CustomButtonPrimary
          type="submit"
          variant="contained"
          color="primary"
          sx={{ m: "auto" }}
        >
          Login
        </CustomButtonPrimary>
      </Box>

      <Typography sx={{ textAlign: "center", my: 2 }}>
        Don't have an account!!&nbsp;
        <Link href="/auth/register">Create account here</Link>
      </Typography>

      <Typography sx={{ textAlign: "center", my: 2 }}>
        <Link href="/auth/reset_password">Forgot Password!! Reset Here</Link>
      </Typography>
    </Container>
  );
};

export default Login;
