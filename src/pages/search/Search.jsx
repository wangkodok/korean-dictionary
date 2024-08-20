// import axios from "axios";
import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import ReloadButton from "../../features/ui/button/ReloadButton";
import WordList from "../../entities/WordList/ui/WordList";
import Spinner from "../../shared/ui/Spinner/Spinner";
import Form from "../../widgets/SearchForm/Form";

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

  return (
    <div className="relative top-[-2.5rem] p-0 px-[1rem] sm:px-[4rem] md:px-[8rem] lg:px-[16rem] xl:px-[20rem]">
      <div className="rounded-xl">
        <Form
          setQuery={setQuery}
          noWord={noWord}
          setNoWord={setNoWord}
          setSearchResult={setSearchResult}
        />

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
