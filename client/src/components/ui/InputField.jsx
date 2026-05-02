import { useState } from "react";

const EyeIcon = ({ open }) => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        {open ? (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </>
        ) : (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.52-4.072M6.228 6.228A9.97 9.97 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-1.307 2.62M6.228 6.228L3 3m3.228 3.228l3.65 3.65M17.772 17.772L21 21m-3.228-3.228-3.65-3.65" />
            </>
        )}
    </svg>
);

const InputField = ({
    label,
    icon,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    autoComplete,
    isPassword = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}
            <div
                className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-white transition-colors ${error
                        ? "border-red-400 focus-within:border-red-500"
                        : "border-gray-200 focus-within:border-orange-400"
                    }`}
            >
                {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="text-gray-400 hover:text-gray-600 shrink-0 transition-colors"
                        tabIndex={-1}
                    >
                        <EyeIcon open={showPassword} />
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
        </div>
    );
};

export default InputField;
