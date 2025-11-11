"use client";

interface PopupProps {
  message: string;
  type: string;
  onClose: () => void;
}

const PopUp = ({ message, type, onClose }: PopupProps) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.popup} ${styles[type]}`}>
        <p>{message}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default PopUp;
