"use client"; // nếu bạn dùng ở client, thêm dòng này

import styles from "./Popup.module.scss";

interface PopUpProps {
  message: string;
  type: "" | "success" | "error" | "warning";
  onClose: () => void;
  onSubmit?: () => void; // Added onSubmit for handling OTP submission
  inputValue?: string; // Added inputValue for OTP input
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onInputChange for OTP input
}

const PopUp: React.FC<PopUpProps> = ({ message, type, onClose, onSubmit, inputValue, onInputChange }) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.popup} ${type ? styles[type] : ""}`}>
        <p>{message}</p>
        {onInputChange && (
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
          />
        )}
        <button onClick={onClose}>Đóng</button>
        {onSubmit && <button onClick={onSubmit}>Xác nhận</button>}
      </div>
    </div>
  );
};

export default PopUp;
