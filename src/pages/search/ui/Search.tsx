import axios from "axios";
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

  // useEffect(() => {
  //   const fetchData = async (query: string) => {
  //     setLoading(true); // 데이터 요청 전 로딩 시작
  //     try {
  //       console.log(query);
  //       const response = await fetch(
  //         `https://react-server-wangkodok.koyeb.app/get-search?query=${query}`
  //       );

  //       if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");

  //       const result = await response.json();
  //       console.log(result.message);
  //       setDataApi(result); // 데이터 상태 업데이트
  //       setIsSearchButton(false);
  //     } catch (error) {
  //       console.log(error);
  //       setError(true); // 에러 상태 업데이트
  //     } finally {
  //       setLoading(false); // 로딩 종료
  //     }
  //   };

  //   if (isSearchButton) {
  //     fetchData(query);
  //   }
  // }, [query, isSearchButton]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError(null); // 이전 오류 초기화
  // };

  useEffect(() => {
    if (isSearchButton) {
      setLoading(true);
      const fetchDataFromServer = async () => {
        try {
          const response = await axios.post(
            "https://react-server-wangkodok.koyeb.app/api/data",
            {
              query,
            }
          );
          setDataApi(response.data); // 서버에서 받은 데이터
        } catch (err) {
          // setError("데이터를 가져오는 데 실패했습니다.");
        } finally {
          setIsSearchButton(false); // 요청 후 fetchData 초기화
          setLoading(false);
        }
      };

      fetchDataFromServer();
    }
  }, [isSearchButton]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // setError(null); // 이전 오류 초기화

  //   try {
  //     const response = await axios.post("http://localhost:8000/api/data", {
  //       query,
  //     });
  //     setDataApi(response.data); // 서버에서 받은 데이터
  //   } catch (err) {
  //     // setError("데이터를 가져오는 데 실패했습니다.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="relative top-[-2.5rem] p-0 px-[1rem] sm:px-[4rem] md:px-[8rem] lg:px-[16rem] xl:px-[20rem]">
      <div className="rounded-xl">
        <Form
          query={query}
          setQuery={setQuery}
          // handleSubmit={handleSubmit}
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
