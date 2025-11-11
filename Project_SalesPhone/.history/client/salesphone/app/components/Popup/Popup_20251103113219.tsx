"use client";  // nếu bạn dùng ở client, thêm dòng này

import styles from "./PopUp.module.scss";

interface PopUpProps {
  message: string;
  type: "success" | "error" | "warning" | "";
  // hoặc string nếu không muốn giới hạn
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ message, type, onClose }) => {
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
