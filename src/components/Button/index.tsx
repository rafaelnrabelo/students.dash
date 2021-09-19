import { ButtonHTMLAttributes, ReactElement, cloneElement } from "react";
import { Spinner } from "@chakra-ui/react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement;
  loading?: boolean;
  variant?: "outlined" | "solid";
}

export const Button = ({
  icon,
  loading,
  children,
  className,
  disabled,
  variant = "solid",
  ...htmlButtonProps
}: ButtonProps) => {
  const getClasses = () => {
    if (variant === "solid") {
      return `${styles.Button} ${styles.ButtonSolid} ${className}`;
    } else {
      return `${styles.Button} ${styles.ButtonOutlined} ${className}`;
    }
  };

  return (
    <button
      {...htmlButtonProps}
      className={getClasses()}
      disabled={disabled || loading}
    >
      {loading ? (
        <Spinner color={variant === "outlined" ? "#c7ccd3" : "#fff"} />
      ) : (
        <>
          {icon &&
            cloneElement(icon, {
              style: children ? { marginRight: 8 } : {},
            })}
          {children}
        </>
      )}
    </button>
  );
};
