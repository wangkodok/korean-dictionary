import { createStore } from "redux";

const initialState = { wordSave: [], toggle: false };

const counterReducer = (state = initialState, action) => {
  if (action.type === "word-save") {
    return {
      ...state,
      wordSave: [...state.wordSave, action.word],
    };
  }

  if (action.type === "word-delete") {
    const newWord = state.wordSave.filter(
      (data) => data.target_code !== action.word.target_code
    );

    return {
      ...state,
      wordSave: newWord,
    };
  }

  if (action.type === "side-toggle") {
    return {
      ...state,
      toggle: action.toggle,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
