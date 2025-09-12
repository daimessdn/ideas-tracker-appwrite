import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BaseButton({
  onClick,
  type = "button",
  children,
  disabled = false,
  loading = false,
  href,
  variant = "primary", // primary / secondary
  icon,
}) {
  const baseStyles =
    "px-4 py-2 rounded shadow font-bold transition-colors duration-200 flex flex-row items-center gap-2 cursor-pointer w-fit";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading && (
        <motion.span
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}

      {icon && !loading && <span className="flex-shrink-0">{icon}</span>} 

      <span>{loading ? "Loading..." : children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        to={href}
        className={`${baseStyles} ${variants[variant]} ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
}
