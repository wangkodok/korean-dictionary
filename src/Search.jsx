// import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoAlert } from "react-icons/go";
import PulseLoader from "react-spinners/PulseLoader";
import { useSelector, useDispatch } from "react-redux";

export default function Search() {
  const [searchWord, setSearchWord] = useState("");
  // const [debouncedWord, setDebouncedWord] = useState(searchWord);
  const [searchResult, setSearchResult] = useState("");
  // const [searchHandler, setSearchHandler] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  // const [saveWord, setSaveWord] = useState([]);
  const [noWord, setNoWord] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  function handleSaveWord(data) {
    dispatch({ type: "word-save", word: data });
  }

  const saveWord = useSelector((state) => {
    return state.wordSave;
  });

  useEffect(() => {
    if (saveWord.length === 0) {
      dispatch({ type: "side-toggle", toggle: false });
    }
  }, [dispatch, saveWord]);

  function Input(e) {
    setSearchWord(() => {
      return e.target.value;
    });
  }

  // function handleSaveWord(data) {
  //   console.log(data);
  //   setSaveWord((newWord) => {
  //     return [...newWord, data];
  //   });
  // }

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setDebouncedWord(searchWord);
  //   }, 1000);
  //   return () => clearTimeout(timeout);
  // }, [searchWord]);

  useEffect(() => {
    if (query === "") return;

    async function fetchData() {
      // 스피너
      setLoading(true);
      setSearchResult("");

      setNoWord("");

      try {
        console.log("try");
        // const response = await fetch(
        //   `/api/search.do?certkey_no=6715&key=${
        //     import.meta.env.VITE_API_KEY
        //   }&type_search=search&req_type=json&q=${query}`,
        //   {
        //     headers: {
        //       "X-Target-Api": "https://stdict.korean.go.kr", // 헤더를 통해 동적 API URL 전달
        //     },
        //   }
        // );
        const response = await fetch(
          `https://korean-dictionary-server.onrender.com/fetch-data?query=${query}`
          // {
          //   headers: {
          //     "X-Target-Api": "https://stdict.korean.go.kr", // 헤더를 통해 동적 API URL 전달
          //   },
          // }
        );
        if (response.status >= 500) {
          setSearchResult("");
          setError(true);
        }
        console.log("try");
        if (response.status === 200) {
          const data = await response.json();
          setSearchResult(() => {
            return data;
          });
          setError(false);
        }
        console.log("try");
        setLoading(false);
      } catch (error) {
        if (error.message === "Unexpected end of JSON input") {
          console.log(error.message);
          setNoWord("목록 없음");
          setSearchResult("");
          console.log("catch");
        }
      }
    }
    fetchData();
  }, [query]);

  return (
    <div className="relative top-[-2.5rem] p-0 px-[1rem] sm:px-[4rem] md:px-[8rem] lg:px-[16rem] xl:px-[20rem]">
      <div className="rounded-xl">
        <form
          className="bg-slate-100 shadow-lg shadow-slate-300/50 rounded-xl"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
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
                value={searchWord}
                placeholder="단어를 입력하세요."
                onChange={Input}
              />
            </div>
            <button
              type="submit"
              className="absolute right-[12px] top-[50%] translate-y-[-50%] block w-[100px] h-[48px] bg-slate-100 rounded-xl"
              onClick={() => {
                // setSearchHandler(() => {
                //   return true;
                // });
                setQuery(() => {
                  return searchWord;
                });
                setNoWord("");
                if (noWord === "목록 없음") {
                  setNoWord("목록 없음");
                  setSearchResult("");
                }
              }}
            >
              검색
            </button>
          </div>
        </form>

        {query !== "" && loading === true ? (
          <div className="mt-[4rem] text-center">
            <PulseLoader
              color="#000"
              loading={loading} // useState로 관리
              size={8}
            />
            <p className="mt-[2rem]">
              외부 서버에서 데이터를 불러오고 있습니다. <br /> 잠시만
              기다려주세요.
            </p>
          </div>
        ) : (
          <div className="mt-[4rem]">
            {searchResult.channel === undefined
              ? null
              : searchResult.channel.item.map((data, index) => {
                  // if (searchHandler === true) {
                  return (
                    <dl
                      className="relative py-8 border-b-[.0625rem]"
                      key={index}
                    >
                      <div className="pr-0 mb-6 sm:pr-[10rem] sm:mb-0">
                        <dt className="text-xl mb-2">
                          <strong>{data.word}</strong>
                          {/* <br /> */}
                        </dt>
                        <dd className="">{data.sense.definition}</dd>
                      </div>
                      <button
                        className="static translate-y-0 w-[100px] h-[48px] bg-slate-100 rounded-xl sm:absolute sm:right-[12px] sm:top-[50%] sm:translate-y-[-50%]"
                        onClick={() => {
                          return handleSaveWord(data);
                        }}
                      >
                        단어 저장
                      </button>
                    </dl>
                  );
                  // }
                })}
          </div>
        )}
      </div>
      {error === true ? (
        <div className="text-center">
          <GoAlert className="w-full mb-5" size={32} color="#000" />
          <p className="mb-5">
            외부 서버에서 데이터를 불러오지 못했습니다. <br /> 아래의 버튼을
            클릭 후 다시 시도해 주세요.
          </p>
          <button
            className="h-[48px] px-[24px] bg-slate-100 rounded-xl"
            onClick={() => {
              window.location.reload();
            }}
          >
            다시 시도하기
          </button>
        </div>
      ) : null}
      {noWord === "목록 없음" ? (
        <p className="mb-5">{query} 단어가 없습니다.</p>
      ) : null}
    </div>
  );
}
