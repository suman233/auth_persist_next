import { GetProfileDetails } from "@/api/functions/user.api";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import { getCookie } from "cookies-next";
import { toast } from "sonner";

const Profile = () => {
  // const usertoken = getCookie("token");

  const { data } = useQuery({
    queryKey: ["profiledetails"],
    queryFn: GetProfileDetails
    // enabled: !!usertoken
  });
  console.log("profile", data);

  useEffect(() => {
    if (data?.status === 200) toast.success(data.data.message);
  }, [data?.status]);

  return (
    <Container sx={{ my: 4 }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "40px" }}
      >
        Profile Details
      </Typography>
      <Box sx={{ my: 4 }}>
        <Paper sx={{ width: "50%", margin: "auto", textAlign: "center", p: 4 }}>
          <Typography sx={{ color: "black" }}>
            <strong>First Name:</strong> {data?.data?.data?.first_name}
          </Typography>
          <Typography sx={{ color: "black", my: 1 }}>
            <strong>Last Name: </strong>
            {data?.data?.data?.last_name}
          </Typography>
          <Typography sx={{ color: "black", mb: 1 }}>
            <strong>Email ID: </strong>
            {data?.data?.data?.email}
          </Typography>
          <Typography sx={{ color: "black" }}>
            <strong>Admin Approved: </strong>
            {JSON.stringify(data?.data?.data?.isApproved)}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
