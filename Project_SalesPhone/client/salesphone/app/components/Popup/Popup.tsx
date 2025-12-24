"use client"; // nếu bạn dùng ở client, thêm dòng này

import React from 'react';
import styles from "./Popup.module.scss";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

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
  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className={styles.icon} />;
      case "error":
        return <FaTimesCircle className={styles.icon} />;
      case "warning":
        return <FaExclamationTriangle className={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={`${styles.popup} ${type ? styles[type] : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Đóng"
        >
          <FaTimes />
        </button>

        <div className={styles.content}>
          {getIcon() && (
            <div className={styles.iconContainer}>
              {getIcon()}
            </div>
          )}
          
          <p className={styles.message}>{message}</p>
          
          {onInputChange && (
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={inputValue}
                onChange={onInputChange}
                className={styles.input}
                placeholder="Nhập mã OTP"
                aria-label="OTP input"
              />
            </div>
          )}
          
          <div className={styles.buttonGroup}>
            {onSubmit && (
              <button
                type="button"
                className={`${styles.button} ${styles.confirmButton}`}
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
            <button 
              type="button" 
              className={`${styles.button} ${styles.closeBtn}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                onClose(); 
              }}
            >
              {onSubmit ? 'Hủy' : 'Đóng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
