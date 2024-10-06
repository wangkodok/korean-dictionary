import PulseLoader from "react-spinners/PulseLoader";

export default function Spinner({ loading }: { loading: boolean }) {
  return (
    <div className="mt-[4rem] text-center">
      <PulseLoader
        color="#000"
        loading={loading} // useState로 관리
        size={8}
      />
      <p className="mt-[2rem]">
        외부 서버에서 데이터를 불러오고 있습니다. <br /> 잠시만 기다려주세요.
      </p>
    </div>
  );
}
