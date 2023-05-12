import { RegisterFormField } from "./RegisterForm";

export type NewUser = Omit<RegisterFormField, "confirmPassword">;
