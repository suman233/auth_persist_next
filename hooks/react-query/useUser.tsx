/* eslint-disable no-console */
import { GetProfileDetails } from "@/api/functions/user.api";
import { logout, setUserData } from "@/reduxtoolkit/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/useAppDispatch";
import { useAppSelector } from "../redux/useAppSelector";
import { useRouter } from "next/router";
import { LFormInput } from "@/interface/common.interface";
import { toast } from "sonner";

const useUser = () => {
  // const router = useRouter();
  // const cookies = parseCookies();
  // const token: string = cookies[process.env.NEXT_APP_TOKEN_NAME!];
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((s) => s.userSlice);

  const profileDetails = useQuery({
    queryKey: ["userdetails"],
    queryFn: GetProfileDetails,
    enabled: isLoggedIn,
    refetchOnWindowFocus: false

    // onSuccess: (data) => {
    //   // if (resp.data.status === 200) {
    //   // console.log("signed", data);

    //   dispatch(setUserData(data?.data.data.personal));
    // },

    // onError: () => {
    //   router.push("/auth/login");
    //   dispatch(logout());
    // }
    // onSuccess(data) {
    //   if (data?.data?.status === 401) {
    //     dispatch(logout());
    //   } else {
    //     dispatch(setLoginData(data?.data?.data));
    //   }
    // },
    // onError() {
    //   dispatch(logout());
    // }
  });

  useEffect(() => {
    if(profileDetails.data){
      if(profileDetails.data.status===200){
        dispatch(setUserData(profileDetails.data.data.data))
      }
    }
  }, [profileDetails?.status, profileDetails?.data]);
  //   useEffect(() => {
  //     if (profileDetails?.data) {
  //       if (profileDetails?.data?.status === 401) {
  //         dispatch(logout());
  //       } else {
  //         dispatch(setLoginData(profileDetails?.data?.data?.data));
  //       }
  //     }
  //   }, [profileDetails?.status, profileDetails?.data]);

  return { ...profileDetails };
  // };
};
export default useUser;
