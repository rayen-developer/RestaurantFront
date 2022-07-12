const LOGIN_FAIL = () => {
  return {
    type: "LOGIN_ERROR",
    playload: true,
  };
};

const LOGIN_SUCCESS = () => {
  return {
    type: "LOGIN_SUCCESS",
    playload: "true",
  };
};

const REGISTER_FAIL = () => {
  return {
    type: "REGISTER_ERROR",
    playload: true,
  };
};

const REGISTER_SUCCESS = () => {
  return {
    type: "REGISTER_SUCCESS",
    playload: "",
  };
};

const LOGOUT = () => {
  return {
    type: "LOGOUT",
    playload: "",
  };
};

export { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT };
