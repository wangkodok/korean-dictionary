import { useSelector, useDispatch } from "react-redux";
import CancelButton from "../../features/ui/button/CancelButton";

export default function RecentSearchHistory({ loading, handleSearchHistory }) {
  const store = useSelector((state) => {
    return state.recentSearchHistory;
  });

  const dispatch = useDispatch();

  function handleHistoryDelete(word) {
    dispatch({
      type: "word-history-delete",
      recentSearchHistory: word,
    });
  }

  function handleDeleteAll() {
    dispatch({ type: "delete-all-history", handleDeleteAll: [] });
  }

  return (
    <>
      {!loading && (
        <div className="mt-10 pb-5 border-b-[.0625rem]">
          <div className="mb-5">
            <span>최근 검색어</span>
            <button className="float-right" onClick={handleDeleteAll}>
              전체 삭제
            </button>
          </div>
          {store.length === 0 ? (
            <p className="text-center">최근 검색어 내역이 없습니다.</p>
          ) : (
            <ul>
              {store.map((data, index) => {
                console.log(data, index);
                if (index < 5) {
                  return (
                    <li key={index} className="mb-2">
                      <div className="flex items-center justify-between py-[12px] px-[24px] bg-slate-100 rounded-xl">
                        <button
                          className="mr-[2px]"
                          onClick={() => {
                            return handleSearchHistory(data.word);
                          }}
                        >
                          {data.word}
                        </button>
                        <CancelButton
                          size="20"
                          onClick={() => {
                            return handleHistoryDelete(data.word);
                          }}
                        />
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
