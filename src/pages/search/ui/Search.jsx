// import axios from "axios";
// import { instance } from "../../../app/api/api";
import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import ReloadButton from "../../../features/ui/button/ReloadButton";
import WordList from "../../../entities/WordList/ui/WordList";
import Spinner from "../../../shared/ui/Spinner/Spinner";
import Form from "../../../widgets/SearchForm/Form";
import RecentSearchHistory from "../../../widgets/SearchForm/RecentSearchHistory";

export default function Search() {
  const [searchResult, setSearchResult] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [noWord, setNoWord] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const saveWord = useSelector((state) => {
    return state.wordSave;
  });

  useEffect(() => {
    if (saveWord.length === 0) {
      dispatch({ type: "side-toggle", toggle: false });
    }
  }, [dispatch, saveWord]);

  function handleSearchHistory(word) {
    console.log(word);
    setQuery(word);
  }

  const [queryData, setQueryData] = useState(""); // 사용자가 입력한 검색어를 관리하는 상태
  const [data, setData] = useState(null); // 서버로부터 받은 데이터를 저장하는 상태
  // const [error_, setError_] = useState(null); // 오류 메시지를 저장하는 상태

  console.log(data);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(queryData);
    setLoading(true); // 스피너 start

    try {
      // const response = await fetch("http://localhost:8000/post-search", {
      const response = await fetch(
        "https://react-server-wangkodok.koyeb.app/post-search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ queryData }), // 서버에 전송할 데이터를 JSON으로 변환하여 전송
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json(); // 서버로부터 데이터를 받아옴
      setData(result); // 받아온 데이터를 상태에 저장하여 화면에 출력되도록 함
      // setError_(null); // 오류 상태를 초기화
      setLoading(false); // 스피너 start
    } catch (error) {
      console.error(error);
      // setError_("Failed to fetch data from server"); // 오류가 발생하면 오류 메시지를 저장
      setData(null); // 오류 발생 시 데이터를 초기화
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5173/get-search?query=${queryData}`
          `https://react-server-wangkodok.koyeb.app/get-search?query=${queryData}`
        );
        const result = await response.json();
        console.log(result);
        // setFetchedData(result.data || "No data found");
        console.log("Fetched data from server:", result);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [queryData]);

  return (
    <div className="relative top-[-2.5rem] p-0 px-[1rem] sm:px-[4rem] md:px-[8rem] lg:px-[16rem] xl:px-[20rem]">
      <div className="rounded-xl">
        <div>test</div>
        <Form
          setQuery={setQuery}
          noWord={noWord}
          setNoWord={setNoWord}
          setSearchResult={setSearchResult}
          handleSubmit={handleSubmit}
          queryData={queryData}
          setQueryData={setQueryData}
        />
        {query !== "" && loading === true ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <RecentSearchHistory
              loading={loading}
              handleSearchHistory={handleSearchHistory}
            />
            {data === "ㅅㄷㄴㅅ" ? null : (
              <WordList searchResult={searchResult} data={data} error={error} />
            )}
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
      {noWord === "목록 없음" ? (
        <p className="mb-5">{query} 단어가 없습니다.</p>
      ) : null}
    </div>
  );
}
