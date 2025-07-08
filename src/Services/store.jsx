import { createContext, useContext, useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Reducers
import { authReducer, initialAuthState } from "./Reducers/authReducer";
import { recipeReducer, initialRecipeState } from "./Reducers/recipeReducer";

// Create Context
const StoreContext = createContext();

// ✅ Correct nested initial state
const combinedInitialState = {
  auth: initialAuthState,
  recipes: initialRecipeState,
};

// ✅ Combine reducers properly
const combinedReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
  recipes: recipeReducer(state.recipes, action),
});

// Provider Component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducer, combinedInitialState);

  // ✅ Listen for Firebase auth state changes
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

// Hook to use store
export const useStore = () => useContext(StoreContext);
