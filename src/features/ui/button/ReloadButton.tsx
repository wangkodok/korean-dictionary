import Button from "shared/ui/button";

export default function ReloadButton({
  children,
}: {
  children: React.ReactNode;
}) {
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
