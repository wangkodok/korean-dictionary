import { useDispatch } from "react-redux";
import Button from "shared/ui/button";

export default function WordSearchButton({
  query,
  setQuery,
  children,
}: {
  query: string;
  setQuery: (query: string) => void;
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
          wordHistory: { word: query },
        });

        setQuery(query);
      }}
    >
      {children}
    </Button>
  );
}
