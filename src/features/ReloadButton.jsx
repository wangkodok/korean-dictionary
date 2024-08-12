import Button from "../shared/Button";

export default function ReloadButton({ children }) {
  return (
    <Button
      onClick={() => {
        window.location.reload();
      }}
    >
      {children}
    </Button>
  );
}
