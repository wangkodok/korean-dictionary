import { useDispatch } from "react-redux";
import Button from "../shared/Button";

export default function WordDeleteButton({ data }) {
  const dispatch = useDispatch();

  function handleDeleteWord(data) {
    dispatch({ type: "word-delete", word: data });
  }

  return (
    <Button
      onClick={() => {
        return handleDeleteWord(data);
      }}
    >
      단어 삭제
    </Button>
  );
}
