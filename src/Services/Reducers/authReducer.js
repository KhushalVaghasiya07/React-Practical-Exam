export const initialAuthState = {
  user: null,
  loading: true,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    case "SET_LOADING_FALSE":
      return { ...state, loading: false };
    default:
      return state;
  }
};
