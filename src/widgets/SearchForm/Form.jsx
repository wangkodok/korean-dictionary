import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import WordSearchButton from "../../features/ui/button/WordSearchButton";

export default function Form({
  setQuery,
  noWord,
  setNoWord,
  setSearchResult,
  handleSubmit,
  // queryData,
  // setQueryData,
}) {
  const [searchWord, setSearchWord] = useState("");

  function handleInput(e) {
    setSearchWord(() => {
      return e.target.value;
    });
  }

  return (
    <form
      className="bg-slate-100 shadow-lg shadow-slate-300/50 rounded-xl"
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      // onSubmit={handleSubmit}
    >
      <label htmlFor="text" className="block text-center text-[1.25rem]">
        {/* 국립국어원 표준국어대사전 찾기 */}
      </label>
      <div className="relative items-center bg-white border-[0.0625rem] rounded-xl py-5 pl-[56px] pr-[124px]">
        <CiSearch
          size="32"
          className="absolute left-[12px] top-[50%] translate-y-[-50%]"
        />
        <div className="flex w-full">
          <input
            id="text"
            name="text"
            type="text"
            autoComplete="text"
            required
            className="w-full"
            value={searchWord}
            // value={queryData}
            placeholder="단어를 입력하세요. 예) 나무"
            onChange={handleInput}
            // onChange={(e) => setQueryData(e.target.value)} // 입력값이 변경될 때 상태를 업데이트
          />
        </div>
        <WordSearchButton
          setQuery={setQuery}
          searchWord={searchWord}
          // searchWord={queryData}
          noWord={noWord}
          setNoWord={setNoWord}
          setSearchResult={setSearchResult}
        >
          검색
        </WordSearchButton>
      </div>
    </form>
  );
}
