import axios from "axios";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchHandler, setSearchHandler] = useState(false);
  const [saveWord, setSaveWord] = useState([]);

  function Input(e) {
    setSearchWord(() => {
      return e.target.value;
    });
  }

  function handleSaveWord(data) {
    console.log(data);
    setSaveWord((newWord) => {
      return [...newWord, data];
    });
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchWord === "") return;

      async function fetchData() {
        const { data } = await axios.get(
          `/api/search.do?certkey_no=6715&key=${
            import.meta.env.VITE_API_KEY
          }&type_search=search&req_type=json&q=${searchWord}`
        );

        setSearchResult(() => {
          return data;
        });
        setSearchHandler(() => {
          return false;
        });
      }
      fetchData();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchWord]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="lg:flex">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                국립국어원 표준국어대사전 찾기
              </label>
              <div className="mt-2">
                <input
                  id="text"
                  name="text"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={searchWord}
                  onChange={Input}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

          <div className="mt-6">
            {searchResult.channel === undefined
              ? null
              : searchResult.channel.item.map((data, index) => {
                  if (searchHandler === true) {
                    return (
                      <dl className="divide-y divide-gray-100" key={index}>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            <strong>{data.word}</strong>
                            <br />
                            <button
                              className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
                              onClick={() => {
                                return handleSaveWord(data);
                              }}
                            >
                              단어 저장
                            </button>
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.sense.definition}
                          </dd>
                        </div>
                      </dl>
                    );
                  }
                })}
          </div>
        </div>
        {saveWord.length === 0 ? null : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="m-8">
              <p className="mb-8">단어 저장 목록</p>
              <ul>
                {saveWord.map((data, index) => {
                  return (
                    <li key={index} className="mb-4">
                      <dl>
                        <dt>
                          <strong>{data.word}</strong>
                        </dt>
                        <dd>{data.sense.definition}</dd>
                      </dl>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
