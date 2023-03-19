import { AUTH, LOGOUT } from "../actions/constants";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

      // case LOGIN:
      //   let profile = JSON.parse(localStorage.getItem("profile"));

      // localStorage.setItem("profile", JSON.stringify({...action?.data}));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
