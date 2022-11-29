import * as api from "../api/index";
import { AUTH, CREATE_PROFILE } from "./constants";

export const login = (formData) => async (dispatch) => {
  try {
    //login the user
    const { data } = await api.logIn(formData);

    dispatch({ type: AUTH, data });
    // setLoading(false)
    console.log("Signin successfull");
    // history.push('/dashboard')
    window.location.href = "/";
  } catch (error) {
    // console.log(error?.response?.data?.message)
    console.log(error?.response?.data?.message);
    //   setLoading(false);
  }
};

export const adminregister = (formData) => async (dispatch) => {
  try {
    //Sign up the user
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    const { info } = await api.adminRegister({
      firstName: data?.result?.firstName,
      lastName: data?.result?.lastName,
      email: data?.result?.email,
      userId: data?.result?._id,
      country: data?.result?.country,
      state: data?.result?.state,
      city: data?.result?.city,
      zip: data?.result?.zip,
      contact_number: data?.result?.contact_number,
    });
    dispatch({ type: CREATE_PROFILE, payload: info });
    window.location.href = "/";
    // history.push('/dashboard')
    console.log("Sign up successful");
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    //   setLoading(false);
  }
};

export const customerregister = (formData) => async (dispatch) => {
  try {
    //Sign up the user
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    const { info } = await api.customerRegister({
      firstName: data?.result?.firstName,
      lastName: data?.result?.lastName,
      email: data?.result?.email,
      userId: data?.result?._id,
      country: data?.result?.country,
      state: data?.result?.state,
      city: data?.result?.city,
      zip: data?.result?.zip,
      contact_number: data?.result?.contact_number,
    });
    dispatch({ type: CREATE_PROFILE, payload: info });
    window.location.href = "/";
    // history.push('/dashboard')
    console.log("Sign up successful");
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
    //   setLoading(false);
  }
};
