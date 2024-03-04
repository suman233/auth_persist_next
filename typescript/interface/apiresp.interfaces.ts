import { userData } from "@/types/common.type";
import { BaseApiResponse, IFormInput } from "./common.interface";

export interface IgetSignUpQuery extends BaseApiResponse{
   data: userData
  }