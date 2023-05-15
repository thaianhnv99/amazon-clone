import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { logout } from "../../states/auth/authSlice";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const logoutHandle = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate, user]);
  return (
    <Box>
      <Typography variant="h3">Home page</Typography>
      <Button onClick={logoutHandle}>Logout</Button>
    </Box>
  );
};

export default Home;
