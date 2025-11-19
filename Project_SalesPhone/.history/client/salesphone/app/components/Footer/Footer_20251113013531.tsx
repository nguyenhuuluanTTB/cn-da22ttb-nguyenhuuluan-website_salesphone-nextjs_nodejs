import React from "react";
import styles from "./Footer.module.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* --- Thông tin liên hệ --- */}
        <div className={styles.column}>
          <h3 className={styles.title}>Thông tin liên hệ</h3>

          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <div>
              <strong>Địa chỉ:</strong>
              <p>350-352 Võ Văn Kiệt, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaPhoneAlt className={styles.icon} />
            <div>
              <strong>Điện thoại:</strong>
              <p>028 7108 9666</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaClock className={styles.icon} />
            <div>
              <strong>Giờ làm việc:</strong>
              <p>06:30 - 23:30 hằng ngày</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaEnvelope className={styles.icon} />
            <div>
              <strong>Liên hệ:</strong>
              <p>028 7108 9666</p>
            </div>
          </div>
        </div>

        {/* --- Liên kết nhanh --- */}
        <div className={styles.column}>
          <h3 className={styles.title}>Liên kết nhanh</h3>
          <ul>
            <li>Giới thiệu</li>
            <li>Sản phẩm</li>
            <li>Khuyến mãi</li>
            <li>Tin tức</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* --- Chính sách --- */}
        <div className={styles.column}>
          <h3 className={styles.title}>Chính sách</h3>
          <ul>
            <li>Chính sách bảo hành</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>

        {/* --- Đăng ký nhận tin --- */}
        <div className={styles.column}>
          <h3 className={styles.title}>Đăng ký nhận tin khuyến mãi</h3>
          <div className={styles.subscribe}>
            <input type="email" placeholder="Nhập email của bạn" />
            <button>Đăng ký</button>
          </div>
        </div>
      </div>

      {/* --- Mạng xã hội --- */}
      <div className={styles.social}>
        <p>Kết nối với chúng tôi</p>
        <div className={styles.icons}>
          <FaFacebookF />
          <FaInstagram />
          <FaYoutube />
          <FaTwitter />
        </div>
      </div>

      {/* --- Phương thức thanh toán --- */}
      <div className={styles.payment}>
        <p>Phương thức thanh toán</p>
        <div className={styles.methods}>
          <span>VISA</span>
          <span>MasterCard</span>
          <span>MOMO</span>
          <span>ZaloPay</span>
          <span>VNPAY</span>
          <span>COD</span>
        </div>
      </div>

      {/* --- Footer bottom --- */}
      <div className={styles.bottom}>
        <p>© 2024 PhoneStore. All rights reserved.</p>
        <div className={styles.links}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
