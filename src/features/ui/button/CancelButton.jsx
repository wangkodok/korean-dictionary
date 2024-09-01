import { IoCloseOutline } from "react-icons/io5";

export default function CancelButton({ size, ...props }) {
  return (
    <button {...props}>
      <IoCloseOutline size={size} />
    </button>
  );
}
