import { createSlice } from "@reduxjs/toolkit";
// import { destroyCookie } from "nookies";
import { setUserAccessToken } from "api/axiosInstance";
import { deleteCookie } from "cookies-next";
import { userSliceData } from "../interfaces/interfaces";
import { profileData } from "@/types/common.type";
// import { HYDRATE } from "next-redux-wrapper";

export interface IuserData {
  email: string;
  password: string;
}

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null,
  accessToken: null
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, { payload }: { payload: profileData }) => {
      state.userData = payload;
    },
    setAccessToken: (state, { payload }: { payload: string | null }) => {
      console.log("ayan");
      state.accessToken = payload;
      state.isLoggedIn = Boolean(payload);
      setUserAccessToken(payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.accessToken = null;
      deleteCookie("token");
    }
  }
  // extraReducers: {
  //   [HYDRATE]: (state, { payload }) => {
  //     return {
  //       ...state,
  //       ...payload?.userSlice,
  //     };
  //   },
  // },
});

export const { setUserData, logout, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
