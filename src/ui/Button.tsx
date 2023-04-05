import React from "react";
import classNames from "classnames";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<Props> = ({
  children,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "rounded-md px-3 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex flex-row",
        disabled
          ? "bg-gray-300"
          : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
