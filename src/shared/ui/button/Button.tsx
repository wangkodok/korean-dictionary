export default function Button({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<"button">) {
  return (
    <button
      className={`h-[48px] px-[24px] bg-slate-100 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
