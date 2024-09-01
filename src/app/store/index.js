import { createStore } from "redux";

const initialState = { wordSave: [], toggle: false, recentSearchHistory: [] };

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

  if (action.type === "word-history-add") {
    return {
      ...state,
      recentSearchHistory: [...state.recentSearchHistory, action.wordHistory],
    };
  }

  if (action.type === "word-history-delete") {
    const newWord = state.recentSearchHistory.filter(
      (data) => data.word !== action.recentSearchHistory
    );

    console.log(newWord);

    return {
      ...state,
      recentSearchHistory: newWord,
    };
  }

  if (action.type === "delete-all-history") {
    return {
      ...state,
      recentSearchHistory: action.handleDeleteAll,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
