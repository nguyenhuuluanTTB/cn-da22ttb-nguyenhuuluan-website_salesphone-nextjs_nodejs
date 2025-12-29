"use client";

import React from 'react';
import Link from 'next/link';
import styles from './AuthPopup.module.scss';

interface AuthPopupProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthPopup({ onClose, onSuccess }: AuthPopupProps) {
  const handleLoginClick = () => {
    // Close popup when navigating to login page
    onClose();
  };

  const handleSignupClick = () => {
    // Close popup when navigating to signup page
    onClose();
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={onClose}
    >
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        
        <div className={styles.header}>
          <h2>Chào mừng đến với SalesPhone</h2>
          <p>Vui lòng đăng nhập hoặc đăng ký để sử dụng đầy đủ các tính năng</p>
        </div>

        <div className={styles.buttonGroup}>
          <Link href="/login" className={styles.authButton} onClick={handleLoginClick}>
            <span>Đăng nhập</span>
          </Link>
          
          <Link href="/signup" className={`${styles.authButton} ${styles.signupButton}`} onClick={handleSignupClick}>
            <span>Đăng ký</span>
          </Link>
        </div>

        <div className={styles.guestOption}>
          <button className={styles.guestButton} onClick={onClose}>
            Tiếp tục xem như khách
          </button>
        </div>
      </div>
    </div>
  );
}

