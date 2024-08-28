// import axios from "axios";
import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import ReloadButton from "../../../features/ui/button/ReloadButton";
import WordList from "../../../entities/WordList/ui/WordList";
import Spinner from "../../../shared/ui/Spinner/Spinner";
import Form from "../../../widgets/SearchForm/Form";

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

  useEffect(() => {
    if (query === "") return;

    async function fetchData() {
      // 스피너
      setLoading(true);
      setSearchResult("");

      setNoWord("");

      try {
        const response = await fetch(
          `https://react-server-wangkodok.koyeb.app/fetch-data?query=${query}`
          // `https://korean-dictionary-server.onrender.com/fetch-data?query=${query}`
        );
        if (response.status >= 500) {
          setSearchResult("");
          setError(true);
        }
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          if (data === "") setNoWord("목록 없음");
          setSearchResult(() => {
            return data;
          });
          setError(false);
        }
        setLoading(false);
      } catch (error) {
        if (error.message === "Unexpected end of JSON input") {
          setNoWord("목록 없음");
          setSearchResult("");
        }
      }
    }
    fetchData();
  }, [query]);

  // const [inputValue, setInputValue] = useState("");
  // const [responseMessage, setResponseMessage] = useState("");
  // const [fetchedData, setFetchedData] = useState("");

  const [queryData, setQueryData] = useState(""); // 사용자가 입력한 검색어를 관리하는 상태
  const [data, setData] = useState(null); // 서버로부터 받은 데이터를 저장하는 상태
  // const [error_, setError_] = useState(null); // 오류 메시지를 저장하는 상태

  console.log(data);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(queryData);

    try {
      // const response = await fetch("http://localhost:3000/api/search", {
      const response = await fetch(
        "https://react-server-wangkodok.koyeb.app/api/search",
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
          `https://react-server-wangkodok.koyeb.app/api/search?query=${queryData}`
          // `http://localhost:5173/api/search?query=${queryData}`
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
        <Form
          setQuery={setQuery}
          noWord={noWord}
          setNoWord={setNoWord}
          setSearchResult={setSearchResult}
        />

        <form onSubmit={handleSubmit} className="mt-[100px]">
          <input
            type="text"
            value={queryData}
            onChange={(e) => setQueryData(e.target.value)} // 입력값이 변경될 때 상태를 업데이트
            placeholder="Enter search query"
          />
          <button type="submit">Search</button>
        </form>
        <ul>
          {data === null ? (
            <p>서버로부터 받은 데이터 출력 재확인</p>
          ) : (
            data.channel.item.map((data, index) => {
              return <li key={index}>{data.word}</li>;
            })
          )}
        </ul>

        {query !== "" && loading === true ? (
          <Spinner loading={loading} />
        ) : (
          <WordList searchResult={searchResult} />
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
