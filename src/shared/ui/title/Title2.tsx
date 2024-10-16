export default function Title2({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props}>{children}</h2>;
}
