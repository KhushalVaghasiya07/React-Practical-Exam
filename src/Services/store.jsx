import { createContext, useContext, useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Reducers
import { authReducer, initialAuthState } from "./Reducers/authReducer";
import { recipeReducer, initialRecipeState } from "./Reducers/recipeReducer";

const StoreContext = createContext();

// ✅ Fix the key: use `recipe` not `recipes`
const combinedInitialState = {
  auth: initialAuthState,
  recipe: initialRecipeState,
};

const combinedReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
  recipe: recipeReducer(state.recipe, action), // ✅ fixed
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducer, combinedInitialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_USER", payload: user });
    });
    return () => unsubscribe();
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
