import Button from "shared/ui/button";

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
