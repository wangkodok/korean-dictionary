export default function Desc({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props}>{children}</p>;
}
