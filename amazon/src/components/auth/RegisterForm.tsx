import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import {
  validateNameLength,
  validatePasswordLength,
} from "../../shared/utils/validation/models/length";
import { validateEmail } from "../../shared/utils/validation/models/email";
import { useAppDispatch, useAppSelector } from "../../states/hooks";
import { register, reset } from "../../states/auth/authSlice";
import { CircularProgress } from "@mui/material";

const RegisterForm = () => {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandle: nameChange,
    textBlurHandle: nameBlur,
    clearHandle: nameClear,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandle: confirmPasswordChange,
    textBlurHandle: confirmPasswordBlur,
    clearHandle: confirmPasswordClear,
  } = useInput(validatePasswordLength);

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    )
      return;

    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log("Submit register", newUser);

    dispatch(register(newUser));
  };

  const clearForm = useCallback(() => {
    nameClear();
    emailClear();
    passwordClear();
    confirmPasswordClear();
  }, [confirmPasswordClear, emailClear, nameClear, passwordClear]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate("/signin");
    }
  }, [clearForm, dispatch, isSuccess, navigate]);

  if (isLoading)
    return (
      <CircularProgress
        sx={{
          marginTop: "64px",
        }}
        color="primary"
      />
    );

  return (
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
          <Typography variant="h4">Create Account</Typography>
          <InputLabel
            sx={{
              fontWeight: 500,
              marginTop: 1,
              color: "#000000",
            }}
            htmlFor="name"
          >
            Your name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChange}
            onBlur={nameBlur}
            error={nameHasError}
            helperText={nameHasError ? "Enter your name" : ""}
            name="name"
            id="name"
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
            helperText={passwordHasError ? "Minimum 6 charaters required" : ""}
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="Minium 6 characters required"
            fullWidth
          />
          <InputLabel
            sx={{
              fontWeight: 500,
              marginTop: 1,
              color: "#000000",
            }}
            htmlFor="re-password"
          >
            Re-enter password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChange}
            onBlur={confirmPasswordBlur}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? "Password must match"
                : ""
            }
            name="re-password"
            id="re-password"
            variant="outlined"
            size="small"
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
          Register
        </Button>
      </form>

      <Box mt={2}>
        <small>
          <span>By creating an account, you agress to Amazon's</span>
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
      <Divider
        sx={{
          mt: 2,
          mb: 2,
        }}
      />
      <Box>
        <small>
          Already have an account?{" "}
          <Link
            color="red"
            to="/signin"
            style={{
              textDecoration: "none",
            }}
          >
            Sign-in
          </Link>
        </small>
      </Box>
      <Box>
        <small>
          Buying for work?{" "}
          <Link
            color="red"
            to="/register"
            style={{
              textDecoration: "none",
            }}
          >
            Create a free business account
          </Link>
        </small>
      </Box>
    </Box>
  );
};

export default RegisterForm;
