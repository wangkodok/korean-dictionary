import { useDispatch } from "react-redux";
import Button from "shared/ui/button";

export default function WordSearchButton({
  setQuery,
  queryData,
  children,
}: {
  setQuery: (query: string) => void;
  queryData: string;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  return (
    <Button
      type="submit"
      className="absolute right-[12px] top-[50%] translate-y-[-50%]"
      onClick={() => {
        dispatch({
          type: "word-history-add",
          wordHistory: { word: queryData },
        });

        setQuery(queryData);
      }}
    >
      {children}
    </Button>
  );
}
