import { useState } from "react";

export default function BaseInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  validate,
  multiline = false, // ⬅️ tambahan untuk textarea
  rows = 4, // default tinggi textarea
}) {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  function handleBlur() {
    setTouched(true);

    if (required && !value) {
      setError(`${label || "Field"} is required`);
      return;
    }

    if (minLength && value.length < minLength) {
      setError(`${label || "Field"} must be at least ${minLength} characters`);
      return;
    }

    if (validate) {
      const customError = validate(value);
      if (customError) {
        setError(customError);
        return;
      }
    }

    setError("");
  }

  const commonProps = {
    placeholder,
    value,
    onChange: (e) => {
      onChange(e);
      if (touched) handleBlur();
    },
    onBlur: handleBlur,
    className: `bg-white border p-3 rounded shadow outline-none text-base ${
      error ? "border-red-500" : "border-gray-300"
    }`,
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      {multiline ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
