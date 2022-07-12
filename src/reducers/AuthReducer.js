const initialState = {
  isLogged: localStorage.getItem("token") ? true : false,
  error: false,
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "REGISTER_SUCCESS": {
      return {
        ...state,
        isLogged: false,
        error: false,
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        isLogged: true,
        error: false,
      };
    }

    case "LOGOUT": {
      return {
        isLogged: false,
      };
    }
    default:
      return state;
  }
};
export default AuthReducer;
