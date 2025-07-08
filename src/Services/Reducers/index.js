// Services/Reducers/index.js

import { authReducer, initialAuthState } from "./authReducer";
import { recipeReducer, initialRecipeState } from "./recipeReducer";

// Combine initial state
export const initialRootState = {
  auth: initialAuthState,
  recipe: initialRecipeState,
};

// Combine reducers manually
export const rootReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
  recipe: recipeReducer(state.recipe, action),
});
