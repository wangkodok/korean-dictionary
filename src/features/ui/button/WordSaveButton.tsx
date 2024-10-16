import React from "react";
import { useDispatch } from "react-redux";
import Button from "shared/ui/button";

export default function WordSaveButton({
  data,
  children,
}: {
  data: {};
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  function handleSaveWord(data: {}) {
    dispatch({ type: "word-save", word: data });
  }

  return (
    <Button
      className="static translate-y-0 sm:absolute sm:right-[12px] sm:top-[50%] sm:translate-y-[-50%]"
      onClick={() => {
        return handleSaveWord(data);
      }}
    >
      {children}
    </Button>
  );
}
