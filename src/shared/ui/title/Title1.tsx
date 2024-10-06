export default function Title1({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...props}>{children}</h1>;
}
