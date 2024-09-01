import { useDispatch } from "react-redux";
import Button from "shared/ui/button";

export default function WordSearchButton({
  setQuery,
  searchWord,
  noWord,
  setNoWord,
  setSearchResult,
  children,
}) {
  const dispatch = useDispatch();

  return (
    <Button
      type="submit"
      className="absolute right-[12px] top-[50%] translate-y-[-50%]"
      onClick={() => {
        dispatch({
          type: "word-history-add",
          wordHistory: { word: searchWord },
        });

        setQuery(() => {
          return searchWord;
        });
        setNoWord("");
        if (noWord === "목록 없음") {
          setNoWord("목록 없음");
          setSearchResult("");
        }
      }}
    >
      {children}
    </Button>
  );
}
