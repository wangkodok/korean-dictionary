import axios from "axios";
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
    if (isSearchButton) {
      setLoading(true);
      const fetchDataFromServer = async () => {
        try {
          const response = await axios.post(
            `https://react-server-wangkodok.koyeb.app/api/data`,
            {
              query,
            }
          );
          console.log(response);
          setDataApi(response.data);
        } catch (err) {
          setError(true);
        } finally {
          setIsSearchButton(false);
          setLoading(false);
        }
      };

      fetchDataFromServer();
    }
  }, [isSearchButton]);

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
