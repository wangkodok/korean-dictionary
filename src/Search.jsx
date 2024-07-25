import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoAlert } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";

export default function Search() {
  const [searchWord, setSearchWord] = useState("");
  const [debouncedWord, setDebouncedWord] = useState(searchWord);
  const [searchResult, setSearchResult] = useState("");
  const [searchHandler, setSearchHandler] = useState(false);
  const [error, setError] = useState(false);
  // const [saveWord, setSaveWord] = useState([]);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedWord(searchWord);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchWord]);

  useEffect(() => {
    if (debouncedWord === "") return;

    async function fetchData() {
      try {
        const { data } = await axios.get(
          `/api/search.do?certkey_no=6715&key=${
            import.meta.env.VITE_API_KEY
          }&type_search=search&req_type=json&q=${debouncedWord}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        setSearchResult(() => {
          return data;
        });
        setSearchHandler(() => {
          return false;
        });
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }
    fetchData();
    // const delayDebounceFn = setTimeout(() => {
    // }, 1000);
    // return () => clearTimeout(delayDebounceFn);
  }, [debouncedWord]);

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
                setSearchHandler(() => {
                  return true;
                });
              }}
            >
              검색
            </button>
          </div>
        </form>

        <div className="mt-[4rem]">
          {searchResult.channel === undefined
            ? null
            : searchResult.channel.item.map((data, index) => {
                if (searchHandler === true) {
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
                }
              })}
        </div>
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
    </div>
  );
}
