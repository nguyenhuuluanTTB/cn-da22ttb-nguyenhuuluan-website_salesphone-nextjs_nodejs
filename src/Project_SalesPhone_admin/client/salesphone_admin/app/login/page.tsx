"use client";

import React, { useState } from 'react';
import styles from './login.module.scss';
import { login } from './api/login';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [displayNotificationSuccess, setDisplayNotificationSuccess] = useState(false);
  const [displayNotificationError, setDisplayNotificationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const e: { username?: string; password?: string } = {};
    if (!username) e.username = 'Vui lòng nhập tên đăng nhập';
    if (!password) e.password = 'Vui lòng nhập mật khẩu';
    if (Object.keys(e).length) { setErrors(e); return; }

    try {
      setErrors({});
      const res = await login({ username, password });
      setDisplayNotificationSuccess(true);
      // store token if provided
      if (res.token) localStorage.setItem('token', res.token);
      // redirect to home after a short delay
      setTimeout(() => { window.location.href = '/home'; }, 1500);
    } catch (err: any) {
      const msg = err?.message || (typeof err === 'string' ? err : 'Đăng nhập thất bại');
      setErrorMessage(msg);
      setDisplayNotificationError(true);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.title}><h1>ĐĂNG NHẬP</h1></div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">Tên đăng nhập</label>
            <input id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập tên đăng nhập" />
            {errors.username && <small className={styles.error}>{errors.username}</small>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Mật khẩu</label>
            <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
            {errors.password && <small className={styles.error}>{errors.password}</small>}
          </div>

          <div className={styles.actions}>
            <button className={styles.btndk} onClick={handleLogin}>Đăng nhập</button>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <div className={displayNotificationSuccess ? styles.container_notification : styles.notification_none} onClick={() => setDisplayNotificationSuccess(false)}>
        <div className={styles.notification}>
          <span>Đăng nhập thành công!</span>
          <FaCheckCircle style={{color: 'green', fontSize: '50pt'}}/>
        </div>
      </div>

      {/* Error Notification */}
      <div className={displayNotificationError ? styles.container_notification : styles.notification_none} onClick={() => setDisplayNotificationError(false)}>
        <div className={styles.notification}>
          <span>{errorMessage}</span>
          <FaTimesCircle style={{color: 'red', fontSize: '50pt'}}/>
        </div>
      </div>
    </div>
  );
}
