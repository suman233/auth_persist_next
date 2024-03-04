import {
  BaseApiResponse,
  IuserProfileResponse,
  LFormInput
} from "./../../typescript/interface/common.interface";
import { IFormInput } from "@/interface/common.interface";

import { IgetSignUpQuery } from "@/interface/apiresp.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { logSchema } from "pages/auth/login";

export const signUpMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post(endpoints.auth.signup, body);
  return res;
};
export const loginMutation = async (body: logSchema) => {
  const res = await axiosInstance.post(endpoints.auth.login, body);
  return res;
};
export const GetProfileDetails = async () => {
  const res = await axiosInstance.get(
    endpoints.auth.profileDetails,
    
  );
  return res;
};
// export const signUpProfileMutation = async (body: IFormInput) => {
//   const res = await axiosInstance.post<IgetSignUpQuery>(
//     endpoints.auth.signUpProfile,
//     body
//   );
//   return res;
// };
interface Forgot {
  email: string;
  otp: string;
}
interface OTP {
  email: string;
  otp: string;
}
interface Reset {
  email: string;
  password: string;
  confirm_password: string;
}
export const forgetPassword = async (body: Forgot) => {
  const resp = await axiosInstance.post(endpoints.auth.forget, body);
  return resp;
};
export const otpVerifyFunc = async (body: OTP) => {
  const resp = await axiosInstance.post(endpoints.auth.otp, body);
  return resp;
};

export const passwordReset = async (body: Reset) => {
  const resp = await axiosInstance.post(endpoints.auth.reset, body);
  return resp;
};
