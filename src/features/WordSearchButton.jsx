import Button from "../shared/Button";

export default function WordSearchButton({
  setQuery,
  searchWord,
  noWord,
  setNoWord,
  setSearchResult,
  children,
}) {
  return (
    <Button
      type="submit"
      className="absolute right-[12px] top-[50%] translate-y-[-50%]"
      onClick={() => {
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
