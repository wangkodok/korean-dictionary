// import axios from "axios";
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

  // useEffect(() => {
  //   if (query === "") return;
  //   setLoading(true); // 스피너 start
  //   const fetchData = (retryCount = 3) => {
  //     fetch(
  //       `/api/search.do?key=9685DE18F33A035667C656E856E9C401&type_search=search&req_type=json&q=${query}`,
  //       {
  //         method: "GET",
  //         // headers: {
  //         //   // "Content-Type": "text/json; charset=UTF-8",
  //         //   // Accept: "text/json; charset=UTF-8",
  //         //   // Authorization: `Bearer 9685DE18F33A035667C656E856E9C401`,
  //         //   "Content-Language": "ko-KR",
  //         //   // "Content-Type": "Application/json"
  //         // },
  //         headers: {
  //           accept: "*/*",
  //           "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  //           "content-language": "ko-KR",
  //           cookie:
  //             "WMONID=MB6u9WrHETP; STCID=STC2&&NqCsmf4ZqYvvX47hX3kS1mm0HLyftXpHnRzQC0L5JpksTZGWpbQf!219788197!1725921497167; stdict=NqCsmf4ZqYvvX47hX3kS1mm0HLyftXpHnRzQC0L5JpksTZGWpbQf!219788197",
  //           priority: "u=1, i",
  //           referer: "https://korean-dictionary-three.vercel.app/",
  //           "sec-ch-ua":
  //             '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
  //           "sec-ch-ua-mobile": "?0",
  //           "sec-ch-ua-platform": '"Windows"',
  //           "sec-fetch-dest": "empty",
  //           "sec-fetch-mode": "cors",
  //           "sec-fetch-site": "same-origin",
  //           "user-agent":
  //             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         // 응답이 성공적이지 않으면 에러를 발생시킴
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         // 응답 처리
  //         return response.json(); // JSON 데이터로 파싱된 Promise를 반환
  //       })
  //       .then((data) => {
  //         // 파싱된 데이터를 사용하여 처리
  //         console.log(data);
  //         setSearchResult(data);
  //         setLoading(false);
  //         setError(false);
  //       })
  //       .catch((error) => {
  //         if (retryCount > 0) {
  //           console.log(`Retrying... attempts left: ${retryCount}`);
  //           setTimeout(() => fetchData(retryCount - 1), 1000); // 1초 후 재시도
  //         } else {
  //           setError(true);
  //           setLoading(false);
  //           console.error("Final error:", error);
  //         }
  //         // 요청 또는 응답에 오류가 발생한 경우 처리
  //         console.error("Error:", error);
  //       });
  //   };
  //   fetchData(); // 타이머 대신 즉시 API 호출
  // }, [query]);

  useEffect(() => {
    if (query === "") return;
    setLoading(true); // 스피너 start
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

    const fetchData = (retryCount = 3) => {
      fetch(
        // `https://stdict.korean.go.kr/api/search.do/key=9685DE18F33A035667C656E856E9C401&type_search=search&req_type=json&q=${query}`,
        // `https://korean-dictionary-three.vercel.app/api/search.do?certkey_no=6715&key=9685DE18F33A035667C656E856E9C401&type_search=search&req_type=json&q=${query}`,
        `${PROXY}/api/search.do?certkey_no=6715&key=9685DE18F33A035667C656E856E9C401&type_search=search&req_type=json&q=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "text/json; charset=UTF-8",
            Accept: "text/json; charset=UTF-8",
            Authorization: `Bearer 9685DE18F33A035667C656E856E9C401`,
            "Content-Language": "ko-KR",
            // "Content-Type": "Application/json",
          },
        }
      )
        .then((response) => {
          // // 응답이 성공적이지 않으면 에러를 발생시킴
          // if (!response.ok) {
          //   throw new Error("Network response was not ok");
          // }
          // 응답 처리
          return response.json(); // JSON 데이터로 파싱된 Promise를 반환
        })
        .then((data) => {
          // 파싱된 데이터를 사용하여 처리
          console.log(data);
          setSearchResult(data);
          setLoading(false);
          setError(false);
        })
        .catch((error) => {
          if (retryCount > 0) {
            console.log(`Retrying... attempts left: ${retryCount}`);
            setTimeout(() => fetchData(retryCount - 1), 1000); // 1초 후 재시도
          } else {
            setError(true);
            setLoading(false);
            console.error("Final error:", error);
          }
          // 요청 또는 응답에 오류가 발생한 경우 처리
          console.error("Error:", error);
        });
    };
    fetchData(); // 타이머 대신 즉시 API 호출
  }, [query]);

  return (
    <div className="relative top-[-2.5rem] p-0 px-[1rem] sm:px-[4rem] md:px-[8rem] lg:px-[16rem] xl:px-[20rem]">
      <div className="rounded-xl">
        <div>test</div>
        <Form
          setQuery={setQuery}
          noWord={noWord}
          setNoWord={setNoWord}
          setSearchResult={setSearchResult}
          // handleSubmit={handleSubmit}
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
            <WordList searchResult={searchResult} error={error} />
          </>
        )}
      </div>
      {error === true && searchResult === "" ? (
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
