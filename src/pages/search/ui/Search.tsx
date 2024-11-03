// import axios from "axios";
// import { instance } from "../../../app/api/api";
// import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WordList from "entities/WordList/ui/WordList";
import Spinner from "shared/ui/Spinner/Spinner";
import Form from "widgets/SearchForm/Form";
import ErrorAlert from "widgets/ErrorAlert/ErrorAlert";
import RecentSearchHistory from "widgets/SearchForm/RecentSearchHistory";

export default function Search() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSearchButton, setIsSearchButton] = useState(false);
  const [dataApi, setDataApi] = useState(null);

  const dispatch = useDispatch();

  const saveWord = useSelector((state: { wordSave: {}[] }) => {
    return state.wordSave;
  });

  useEffect(() => {
    if (saveWord.length === 0) {
      dispatch({ type: "side-toggle", toggle: false });
    }
  }, [saveWord]);

  function handleSearchHistory(word: string) {
    console.log(word);
    setQuery(word);
    setIsSearchButton(true);
  }

  useEffect(() => {
    const fetchData = async (query: string) => {
      setLoading(true); // 데이터 요청 전 로딩 시작
      try {
        console.log(query);
        const response = await fetch(
          // `https://react-server-wangkodok.koyeb.app/get-search?query=${query}`
          // `/api/search.do?key=2F1FD2DE79F04A47AF6C6C002898B654&type_search=search&req_type=json&q=${query}`
          "/api/hello"
        );

        if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");

        const result = await response.json();
        setDataApi(result); // 데이터 상태 업데이트
        setIsSearchButton(false);
      } catch (error) {
        console.log(error);
        setError(true); // 에러 상태 업데이트
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    if (isSearchButton) {
      fetchData(query);
    }
  }, [query, isSearchButton]);

  return (
    <div className="relative top-[-2.5rem] p-0 px-[1rem] sm:px-[4rem] md:px-[8rem] lg:px-[16rem] xl:px-[20rem]">
      <div className="rounded-xl">
        <Form
          query={query}
          setQuery={setQuery}
          setIsSearchButton={setIsSearchButton}
        />

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            {dataApi !== null ? (
              <RecentSearchHistory handleSearchHistory={handleSearchHistory} />
            ) : null}

            <WordList dataApi={dataApi} />
          </>
        )}
      </div>
      {error && <ErrorAlert />}
    </div>
  );
}
