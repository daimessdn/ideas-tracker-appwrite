import { Link } from "react-router-dom";

export default function BaseButton({
  onClick,
  type = "button",
  children,
  href,
  variant = "primary", // "primary" | "secondary"
  disabled = false,
}) {
  const baseStyle =
    "px-4 py-2 rounded font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: "bg-blue-500 text-white shadow hover:bg-blue-600",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const className = `${baseStyle} ${variants[variant]}`;

  if (href) {
    // kalau href ada → jadikan Link
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
