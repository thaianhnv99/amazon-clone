import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import useInput from "../../hooks/use-input";
import { validateEmail } from "../../shared/utils/validation/models/email";
import { validatePasswordLength } from "../../shared/utils/validation/models/length";
import { login, reset } from "../../states/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandle: emailChange,
    textBlurHandle: emailBlur,
    clearHandle: emailClear,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandle: passwordChange,
    textBlurHandle: passwordBlur,
    clearHandle: passwordClear,
  } = useInput(validatePasswordLength);

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;

    dispatch(login({ email, password }));
  };

  const clearForm = useCallback(() => {
    emailClear();
    passwordClear();
  }, [emailClear, passwordClear]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(reset());
      clearForm();
    }
  }, [clearForm, dispatch, isSuccess, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isLoading && (
        <CircularProgress
          sx={{
            marginTop: "64px",
          }}
          color="primary"
        />
      )}
      {!isLoading && !isAuthenticated && (
        <Box
          sx={{
            border: "1px solid gray",
            width: "350px",
            p: 2,
            mt: 4,
          }}
        >
          <form onSubmit={onSubmitHandle}>
            <Grid
              container
              justifyContent="flex-start"
              direction="column"
              alignItems="flex-start"
              fontStyle="italic"
            >
              <Typography variant="h4">Sign-In</Typography>
              <InputLabel
                sx={{
                  fontWeight: 500,
                  marginTop: 1,
                  color: "#000000",
                }}
                htmlFor="email"
              >
                Email
              </InputLabel>
              <TextField
                value={email}
                onChange={emailChange}
                onBlur={emailBlur}
                error={emailHasError}
                helperText={emailHasError ? "Enter your email" : ""}
                name="email"
                id="email"
                variant="outlined"
                size="small"
                fullWidth
              />
              <InputLabel
                sx={{
                  fontWeight: 500,
                  marginTop: 1,
                  color: "#000000",
                }}
                htmlFor="password"
              >
                Password
              </InputLabel>
              <TextField
                value={password}
                onChange={passwordChange}
                onBlur={passwordBlur}
                error={passwordHasError}
                helperText={
                  passwordHasError ? "Minimum 6 charaters required" : ""
                }
                name="password"
                id="password"
                variant="outlined"
                size="small"
                placeholder="Minium 6 characters required"
                fullWidth
              />
            </Grid>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                textTransform: "none",
              }}
            >
              Sign-In
            </Button>
          </form>

          <Box mt={2}>
            <small>
              <span>By continuing, you agree to Amazon's</span>
            </small>
          </Box>
          <Box>
            <small>
              <Link
                to="#"
                style={{
                  textDecoration: "none",
                }}
              >
                {" "}
                Conditions of use
              </Link>{" "}
              and{" "}
              <Link to="#" style={{ textDecoration: "none" }}>
                Privacy
              </Link>
            </small>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SigninForm;
