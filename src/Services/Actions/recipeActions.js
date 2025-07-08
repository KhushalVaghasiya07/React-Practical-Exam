import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

export const addRecipe = (recipeData, user) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_RECIPE_REQUEST" });

    const newRecipe = {
      ...recipeData,
      createdAt: serverTimestamp(),
      userId: user?.uid || null,
      userEmail: user?.email || null,
    };

    const docRef = await addDoc(collection(db, "recipes"), newRecipe);

    dispatch({
      type: "ADD_RECIPE_SUCCESS",
      payload: { id: docRef.id, ...newRecipe },
    });
  } catch (error) {
    dispatch({
      type: "ADD_RECIPE_FAIL",
      payload: error.message,
    });
  }
};

export const updateRecipe = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_RECIPE_REQUEST" });

    const recipeRef = doc(db, "recipes", id);
    await updateDoc(recipeRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });

    dispatch({
      type: "UPDATE_RECIPE_SUCCESS",
      payload: { id, ...updatedData },
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_RECIPE_FAIL",
      payload: error.message,
    });
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_RECIPE_REQUEST" });

    const recipeRef = doc(db, "recipes", id);
    await deleteDoc(recipeRef);

    dispatch({
      type: "DELETE_RECIPE_SUCCESS",
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_RECIPE_FAIL",
      payload: error.message,
    });
  }
};
