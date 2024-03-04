import React from "react";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IFormInput } from "@/interface/common.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailRegex } from "@/lib/functions/_helpers.lib";
import validationText from "@/json/messages/validationText";
import { useMutation } from "@tanstack/react-query";
import { signUpMutation } from "@/api/functions/user.api";
import { toast } from "sonner";

const schema = yup
  .object({
    fullName: yup.string().required(validationText.error.fullName),
    email: yup
      .string()
      .trim()
      .required(validationText.error.enter_email)
      .matches(emailRegex, validationText.error.email_format),
    password: yup.string().required(validationText.error.enter_password)
    // profileimage: yup.string().required(validationText.error.enter_image),
  })
  .required();

export type signUpSchema = yup.InferType<typeof schema>;

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const { mutate } = useMutation({ mutationFn: signUpMutation });

  const onSubmit = (data: signUpSchema) => {
  
    console.log("signed", data);

    mutate(
      { ...data },
      {
        onSuccess: (resp) => {
          // reset();
          if (resp.data.status === 200) {
            console.log("signed", data);

            toast.success(resp?.data?.message);
            router.push("/auth/login");
          }
        }
      }
    );
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Sign Up Form
      </Typography>

      <Box width={"50%"} sx={{ margin: "auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFieldCommon
            type="text"
            label="Full Name"
            sx={{ mt: 2 }}
            {...register("fullName")}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
          />
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
            Sign Up
          </CustomButtonPrimary>
        </form>
      </Box>
      <Typography sx={{ textAlign: "center", my: 2 }}>
        Already have an account?&nbsp;
        <Link href="/auth/login"> Login Here </Link>
      </Typography>
    </Container>
  );
};

export default Register;
