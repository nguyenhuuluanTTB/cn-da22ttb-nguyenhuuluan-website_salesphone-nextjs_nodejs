'use client';

import { useState, useEffect } from 'react';
import styles from './payment.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaymentData {
  qrCodeUrl?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  amount?: number;
  content?: string;
  status?: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      checkPaymentStatus();
    }
  }, [orderId]);

  const checkPaymentStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/payment/status/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setPaymentData(data.data);
      }
    } catch (err) {
      console.error('Check status error:', err);
    }
  };

  const handleCreatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch('http://localhost:5000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: formData.get('orderId'),
          amount: parseFloat(formData.get('amount') as string),
          description: formData.get('description')
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Hiển thị QR code hoặc thông tin thanh toán
        setPaymentData(data.data);
      } else {
        setError(data.message || 'Tạo thanh toán thất bại');
      }
    } catch (err) {
      const error = err as Error;
      setError('Lỗi kết nối: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentCard}>
        <h1>Thanh Toán</h1>

        {!paymentData ? (
          <form onSubmit={handleCreatePayment} className={styles.paymentForm}>
            <div className={styles.formGroup}>
              <label htmlFor="orderId">Mã đơn hàng:</label>
              <input 
                type="text" 
                id="orderId" 
                name="orderId" 
                defaultValue={orderId || ''}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="amount">Số tiền (VNĐ):</label>
              <input 
                type="number" 
                id="amount" 
                name="amount" 
                min="1000" 
                step="1000"
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Nội dung:</label>
              <input 
                type="text" 
                id="description" 
                name="description" 
                placeholder="Thanh toán đơn hàng"
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Tạo Thanh Toán'}
            </button>
          </form>
        ) : (
          <div className={styles.paymentInfo}>
            <h2>Thông tin thanh toán</h2>
            
            <div className={styles.qrSection}>
              {paymentData.qrCodeUrl && (
                <img 
                  src={paymentData.qrCodeUrl} 
                  alt="QR Code thanh toán" 
                  className={styles.qrCode}
                />
              )}
            </div>

            <div className={styles.bankInfo}>
              <p><strong>Ngân hàng:</strong> {paymentData.bankName}</p>
              <p><strong>Số tài khoản:</strong> {paymentData.accountNumber}</p>
              <p><strong>Chủ tài khoản:</strong> {paymentData.accountName}</p>
              <p><strong>Số tiền:</strong> {paymentData.amount?.toLocaleString()} VNĐ</p>
              <p><strong>Nội dung:</strong> {paymentData.content}</p>
            </div>

            <div className={styles.instructions}>
              <h3>Hướng dẫn thanh toán:</h3>
              <ol>
                <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                <li>Quét mã QR hoặc chuyển khoản thủ công</li>
                <li>Nhập đúng nội dung chuyển khoản</li>
                <li>Xác nhận thanh toán</li>
              </ol>
            </div>

            <div className={styles.status}>
              <p>Trạng thái: <span className={styles[paymentData.status]}>
                {paymentData.status === 'pending' ? 'Chờ thanh toán' : 
                 paymentData.status === 'completed' ? 'Đã thanh toán' : 
                 'Thất bại'}
              </span></p>
            </div>

            <button 
              onClick={checkPaymentStatus} 
              className={styles.refreshBtn}
            >
              Kiểm tra trạng thái
            </button>

            <button 
              onClick={() => router.push('/order')} 
              className={styles.backBtn}
            >
              Về trang đơn hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
