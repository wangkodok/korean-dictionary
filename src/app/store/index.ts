// import { createStore } from "redux";
import { legacy_createStore as createStore } from "redux";

const initialState: {
  wordSave: [];
  toggle: boolean;
  recentSearchHistory: [];
} = {
  wordSave: [],
  toggle: false,
  recentSearchHistory: [],
};

interface CounterAction {
  type: string;
  word: { target_code: string };
  toggle: boolean;
  wordHistory: {};
  recentSearchHistory: { word: string };
  handleDeleteAll: {};
}

// 리덕스 any 타입 지정 중
const counterReducer: any = (state = initialState, action: CounterAction) => {
  if (action.type === "word-save") {
    return {
      ...state,
      wordSave: [...state.wordSave, action.word],
    };
  }

  if (action.type === "word-delete") {
    const newWord = state.wordSave.filter(
      (data: { target_code: string }) =>
        data.target_code !== action.word.target_code
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
      (data: { word: string }) => {
        console.log(data, "data 타입은?");
        return data.word !== action.recentSearchHistory.word;
      }
    );

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
