import { DisplayUser } from "../models/DisplayUser";
import { LoginUser } from "../models/LoginUser";
import { NewUser } from "../models/NewUser";
import { AxiosResponse } from "axios";
import { Jwt } from "../models/jwt";
import { DecodedJwt } from "../models/DecodedJwt";
import jwt_decode from "jwt-decode";
import { apiClient } from "../../../lib/apiClient";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await apiClient.post<AxiosResponse>(
    "/auth/register",
    newUser
  );
  return response.data;
};

const login = async (user: LoginUser): Promise<Jwt> => {
  const response = await apiClient
    .post<AxiosResponse>("/auth/login", user)
    .then((res) => {
      return {
        ...res,
        data: {
          token: res.data.access_token,
        },
      };
    });
  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));
    const decodeJwt: DecodedJwt = jwt_decode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodeJwt.user));
  }

  return response.data;
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await apiClient.post<AxiosResponse>("/auth/verify-jwt", {
    jwt,
  });

  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > new Date().getTime();
  }

  return false;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
