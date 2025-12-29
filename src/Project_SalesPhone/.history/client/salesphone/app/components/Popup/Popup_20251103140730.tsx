"use client"; // nếu bạn dùng ở client, thêm dòng này

import styles from "./Popup.module.scss";

interface PopUpProps {
  message: string;
  type: "" | "success" | "error" | "warning";
  onClose: () => void;
  onSubmit?: () => void; // handle OTP submission or confirm
  inputValue?: string; // OTP input value
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // OTP input change
  confirmDisabled?: boolean; // disable confirm button when needed
}

const PopUp: React.FC<PopUpProps> = ({
  message,
  type,
  onClose,
  onSubmit,
  inputValue,
  onInputChange,
  confirmDisabled = false,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.popup} ${type ? styles[type] : ""}`}>
        <p>{message}</p>
        {onInputChange && (
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            aria-label="OTP input"
          />
        )}
        <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }}>Đóng</button>
        {onSubmit && (
          <button
            type="button"
            disabled={confirmDisabled}
            onClick={(e) => {
              e.stopPropagation();
              console.log("PopUp: Xác nhận clicked", { disabled: confirmDisabled });
              if (!confirmDisabled && onSubmit) onSubmit();
            }}
            aria-disabled={confirmDisabled}
          >
            Xác nhận
          </button>
        )}
      </div>
    </div>
  );
};

export default PopUp;
