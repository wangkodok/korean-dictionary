export default function Button({ className, children, ...props }) {
  return (
    <button
      className={`h-[48px] px-[24px] bg-slate-100 rounded-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
