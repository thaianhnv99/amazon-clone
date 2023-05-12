import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

const SigninForm = () => {
  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submit signin");
  };
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
  );
};

export default SigninForm;
