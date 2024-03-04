import { AxiosError,AxiosResponse } from 'axios';
import events from '@/json/events/events';
import eventEmitter from 'services/event.emitter';
import { BaseApiResponse } from '@/interface/common.interface';
/**
 * Check if the window object exists.
 * @returns A function that checks if the window is undefined.
 */
export function checkWindow() {
  return typeof window !== "undefined";
}

export function isInServer() {
  return typeof document === "undefined";
}

export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const validationText={
  error:{
     enter_fullName:"Please Enter Your Full Name",
     enter_email:"Please Enter Your Email",
     enter_password:"Please Enter Password",
     enter_image:"Please Enter Your Image"
  }
}
export function isApple() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const platformExpression = /Mac|iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;
  return platformExpression.test(agent);
}

export function isAppleSafari() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  const expectedExpression = /Safari/i;

  const agent = navigator.userAgent;
  if (rejectedExpression.test(agent)) {
    return false;
  }
  return isApple() && expectedExpression.test(agent);
}


export const globalCatchSucess = (response: AxiosResponse<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (response?.data?.message) {
    message = response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: "success" },
  });
};

export const globalCatchWarning = (response: AxiosResponse<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (response?.data?.message) {
    message = response?.data.message;
  }
 
  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: "warning" },
  });
};

export const globalCatchError = (error: AxiosError<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: "error" },
  });
};