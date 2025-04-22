import React from "react";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfileFooter from "./ProfileFooter";

const Profile = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <ProfileHeader isMobile={isMobile} />
      <ProfileForm isMobile={isMobile} />
      <ProfileFooter />
    </Box>
  );
};

export default Profile;
