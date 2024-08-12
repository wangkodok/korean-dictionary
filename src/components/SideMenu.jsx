import { useSelector, useDispatch } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import WordDeleteButton from "../features/WordDeleteButton";

export default function SideMenu() {
  const saveWord = useSelector((state) => {
    return state.wordSave;
  });

  const dispatch = useDispatch();

  function handleToggle() {
    dispatch({ type: "side-toggle", toggle: false });
  }

  return (
    <div className="fixed top-0 right-0 z-10 w-[17.5rem] bg-white shadow-lg shadow-slate-300/50 overflow-auto">
      <div>
        <div className="relative h-[100dvh] p-[2rem]">
          <button
            className="absolute top-[2rem] right-[2rem]"
            onClick={handleToggle}
          >
            <IoCloseOutline size={32} />
          </button>
          {saveWord.length === 0 ? null : (
            <div className="mt-12">
              <div className="">
                <p className="mb-6 text-[1.25rem] font-[900]">내 단어장</p>
                <ul>
                  {saveWord.map((data, index) => {
                    return (
                      <li
                        key={index}
                        className="pb-[1rem] mb-[1rem] border-b-[.0625rem]"
                      >
                        <dl>
                          <dt className="mb-[.25rem]">
                            <strong>{data.word}</strong>
                          </dt>
                          <dd className="mb-[2rem]">{data.sense.definition}</dd>
                        </dl>
                        <WordDeleteButton data={data}>
                          단어 삭제
                        </WordDeleteButton>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
