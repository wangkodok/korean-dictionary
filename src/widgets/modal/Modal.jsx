import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export default function Modal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const popupDismissedDate = localStorage.getItem("popupDismissedDate");
    if (!popupDismissedDate) {
      setVisible(true);
    } else {
      const now = new Date();
      const dismissedDate = new Date(popupDismissedDate);
      if (now - dismissedDate > 24 * 60 * 60 * 1000) {
        setVisible(true);
      }
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  const handleDontShowToday = () => {
    localStorage.setItem("popupDismissedDate", new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-slate-100 bg-opacity-70">
      <div className="absolute top-[50%] right-[50%] translate-y-[-50%] translate-x-[50%] w-[320px] md:w-[510px] items-center bg-white border-[0.0625rem] rounded-xl py-5 pl-[28px] pr-[28px] shadow-lg shadow-slate-300/50">
        <div className="mb-[40px]">
          <strong className="block mb-[24px] text-center text-[1.125rem] md:text-[2rem]">
            알림
          </strong>
          <div className="text-[14px] md:text-[18px]">
            <p className="mb-[12px]">
              <b>
                공공데이터포털에서 Open API 불러오는 과정에서 서버 오류가 발생
              </b>
              할 수 있으니 양해 부탁드립니다.
            </p>
            <p className="mb-[12px]">
              오류가 지속될 경우{" "}
              <a
                href="https://github.com/wangkodok/korean-dictionary/tree/readme"
                target="_black"
                className="underline text-[#0000ee]"
              >
                GitHub README.md
              </a>
              에서 보실 수 있습니다.
            </p>
            <p>고맙습니다.</p>
          </div>
        </div>
        <div className="pt-[40px] border-t-[1px]">
          <button
            className="w-[100%] h-[48px] bg-slate-100 rounded-xl"
            onClick={handleClose}
          >
            닫기
          </button>
          <button
            className="w-[100%] h-[48px] rounded-xl"
            onClick={handleDontShowToday}
          >
            오늘 하루 보지 않기
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#root")
  );
}
