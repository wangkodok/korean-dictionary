import { PiNotepadThin } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
// import { LayoutHeader } from "../../layout/LayoutHeader.jsx";

export const Header = () => {
  const saveWord = useSelector((state: { wordSave: {}[] }) => {
    return state.wordSave;
  });

  const dispatch = useDispatch();

  function handleSideMenu() {
    if (saveWord.length !== 0) {
      dispatch({ type: "side-toggle", toggle: true });
    }
  }

  return (
    <header className="p-0 md:px-8">
      <div className="p-8 flex justify-between items-center">
        <a href="#" className="text-[20px] font-bold font-['Pretendard']">
          ᄑᅀᅭᄌᆞᆫᄀᆞᆨᄋᆞᄃᆡᄉᆞᄌᆞᆫ
        </a>
        <button className="relative" onClick={handleSideMenu}>
          <PiNotepadThin size={32} />
          {saveWord.length === 0 ? null : (
            <span className="absolute top-[-4px] right-[-4px] bg-red-500 text-[12px] text-white w-[20px] h-[20px] rounded-[10px] font-['Pretendard']">
              {saveWord.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
