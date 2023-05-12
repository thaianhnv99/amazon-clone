import { ChangeEvent, useReducer } from "react";
import { Action } from "../shared/models/action.interface";
import {
  INPUT_ACTION_BLUR,
  INPUT_ACTION_CHANGE,
  INPUT_ACTION_CLEAR,
  InputActionType,
} from "./models/InputAction";
import { InputState } from "./models/InputState.interface";
import { ValidatorFn } from "../shared/utils/validation/models/ValidatorFn";

const InitialInputState: InputState = {
  text: "",
  hasBeenTouched: false,
};

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
  const { type, value = "" } = action;

  switch (type) {
    case INPUT_ACTION_CHANGE:
      return {
        text: value,
        hasBeenTouched: state.hasBeenTouched,
      };
    case INPUT_ACTION_BLUR:
      return {
        text: state.text,
        hasBeenTouched: true,
      };
    case INPUT_ACTION_CLEAR:
      return {
        text: "",
        hasBeenTouched: false,
      };

    default:
      return { ...state };
  }
};

const useInput = (validatorFn?: ValidatorFn) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    InitialInputState
  );

  let shouldDisplayError;

  if (validatorFn) {
    const isValid = validatorFn(text);
    shouldDisplayError = !isValid && hasBeenTouched;
  }

  const textChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: INPUT_ACTION_CHANGE, value: e.target.value });
  };

  const textBlurHandle = () => {
    dispatch({ type: INPUT_ACTION_BLUR });
  };

  const clearHandle = () => {
    dispatch({ type: INPUT_ACTION_CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandle,
    textBlurHandle,
    clearHandle,
  };
};

export default useInput;
