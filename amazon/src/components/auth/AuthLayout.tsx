import Grid from "@mui/material/Grid";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Grid
      sx={{
        p: 2,
      }}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <img src="" alt="" />
      <main>{children}</main>
    </Grid>
  );
};

export default AuthLayout;
