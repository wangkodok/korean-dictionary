import { IoCloseOutline } from "react-icons/io5";

export default function CancelButton({
  size,
  ...props
}: { size: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <IoCloseOutline size={size} />
    </button>
  );
}
