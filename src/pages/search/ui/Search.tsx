import axios from "axios";
// import { instance } from "../../../app/api/api";
import React from "react";
import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import ReloadButton from "../../../features/ui/button/ReloadButton";
import WordList from "../../../entities/WordList/ui/WordList";
import Spinner from "../../../shared/ui/Spinner/Spinner";
import Form from "../../../widgets/SearchForm/Form";
import RecentSearchHistory from "../../../widgets/SearchForm/RecentSearchHistory";

export default function Search() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setQuery(word);
  }

  const [queryData, setQueryData] = useState(""); // 사용자가 입력한 검색어를 관리하는 상태
  const [data, setData] = useState(null); // 서버로부터 받은 데이터를 저장하는 상태
  // const [error_, setError_] = useState(null); // 오류 메시지를 저장하는 상태

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setLoading(true); // 스피너 start

  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/get-search?query=${query}`
  //     );
  //     setData(response.data); // 결과를 상태에 저장
  //     setLoading(false); // 스피너 start
  //   } catch (error) {
  //     console.error("Error fetching search result:", error);
  //   }
  // }
  // console.log(data);

  const [dataApi, setDataApi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 요청 전 로딩 시작
      try {
        const response = await fetch(`https://react-server-wangkodok.koyeb.app/get-search?query=${query}`);
        if (!response.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        
        const result = await response.json();
        setDataApi(result); // 데이터 상태 업데이트
      } catch (error) {
        // setError(error.message); // 에러 상태 업데이트
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="relative top-[-2.5rem] p-0 px-[1rem] sm:px-[4rem] md:px-[8rem] lg:px-[16rem] xl:px-[20rem]">
      <div className="rounded-xl">
        <Form
          setQuery={setQuery}
          setQueryData={setQueryData}
          // handleSubmit={handleSubmit}
          queryData={queryData}
        />

        {query !== "" && loading === true ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <RecentSearchHistory
              loading={loading}
              handleSearchHistory={handleSearchHistory}
            />
            {data === "ㅅㄷㄴㅅ" ? null : <WordList dataApi={dataApi} />}
          </>
        )}
      </div>
      {error === true ? (
        <div className="text-center">
          <GoAlert className="w-full mb-5" size={32} color="#000" />
          <p className="mb-5">
            외부 서버에서 데이터를 불러오지 못했습니다. <br /> 아래의 버튼을
            클릭 후 다시 시도해 주세요.
          </p>
          <ReloadButton>다시 시도하기</ReloadButton>
        </div>
      ) : null}
    </div>
  );
}
