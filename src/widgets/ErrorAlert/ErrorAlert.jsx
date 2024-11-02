import { GoAlert } from "react-icons/go";
import ReloadButton from "features/ui/button/ReloadButton";

export default function ErrorAlert() {
  return (
    <div className="text-center">
      <GoAlert className="w-full mb-5" size={32} color="#000" />
      <p className="mb-5">
        외부 서버에서 데이터를 불러오지 못했습니다. <br /> 아래의 버튼을 클릭 후
        다시 시도해 주세요.
      </p>
      <ReloadButton>다시 시도하기</ReloadButton>
    </div>
  );
}
