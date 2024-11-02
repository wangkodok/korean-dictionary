// import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import WordSearchButton from "../../features/ui/button/WordSearchButton";
import React from "react";

export default function Form({
  query,
  setQuery,
  // setQueryData,
  // handleSubmit,
  // queryData,
  setIsSearchButton,
}: {
  query: string;
  setQuery: (query: string) => void;
  // setQueryData: (value: string) => void;
  // handleSubmit: (e: React.FormEvent) => void; // 인자 없는 형태로 정의
  // queryData: string;
  setIsSearchButton: (value: boolean) => void;
}) {
  return (
    <form
      className="bg-slate-100 shadow-lg shadow-slate-300/50 rounded-xl"
      action="#"
      // onSubmit={handleSubmit}
      onSubmit={(e) => {
        e.preventDefault();
        setIsSearchButton(true);
      }}
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
            value={query}
            placeholder="단어를 입력하세요. 예) 나무, 코딩"
            onChange={(e) => {
              console.log(e.target.value);
              setQuery(e.target.value);
            }}
          />
        </div>
        <WordSearchButton query={query} setQuery={setQuery}>
          검색
        </WordSearchButton>
      </div>
    </form>
  );
}
