import React, { useEffect } from 'react';
import styles from './Popup.module.scss';

type Props = { message: string; type?: 'success' | 'error' | ''; onClose?: () => void; duration?: number };

export default function PopUp({ message, type = '', onClose, duration = 3000 }: Props) {
  useEffect(() => { const t = setTimeout(() => onClose && onClose(), duration); return () => clearTimeout(t); }, [duration, onClose]);
  return (
    <div className={`${styles.popup} ${type === 'success' ? styles.success : ''} ${type === 'error' ? styles.error : ''}`}>
      <div className={styles.message}>{message}</div>
      <button className={styles.close} onClick={() => onClose && onClose()}>×</button>
    </div>
  );
}
