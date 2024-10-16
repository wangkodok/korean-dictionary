export default function Title3({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props}>{children}</h3>;
}
