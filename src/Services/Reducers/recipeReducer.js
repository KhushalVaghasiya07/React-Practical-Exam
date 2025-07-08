// Services/Reducers/recipeReducer.js

export const initialRecipeState = {
  loading: false,
  recipes: [],
  error: null,
};

export const recipeReducer = (state = initialRecipeState, action) => {
  switch (action.type) {
    // 👉 Add
    case "ADD_RECIPE_REQUEST":
    case "UPDATE_RECIPE_REQUEST":
    case "DELETE_RECIPE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "ADD_RECIPE_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, action.payload],
        error: null,
      };

    // 👉 Update
    case "UPDATE_RECIPE_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe
        ),
        error: null,
      };

    // 👉 Delete
    case "DELETE_RECIPE_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
        error: null,
      };

    // 👉 Fail cases
    case "ADD_RECIPE_FAIL":
    case "UPDATE_RECIPE_FAIL":
    case "DELETE_RECIPE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
