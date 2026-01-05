import React from 'react';
import styles from './page.module.scss';
import { FaShopify, FaShippingFast, FaThumbsUp } from 'react-icons/fa';

export default function HomePage() {
  return (
    <main className={styles.hero}>
      <div className={styles.container}>
        <section className={styles.left}>
          <h1 className={styles.title}>Welcome to SalesPhone Admin</h1>
          <p className={styles.lead}>
            Quản lý sản phẩm, đơn hàng và chương trình khuyến mãi — giao diện rõ ràng, thao tác
            nhanh chóng, trực quan.
          </p>

          <div className={styles.ctaRow}>
            <button className={styles.btnPrimary}>Mở Dashboard</button>
            <button className={styles.btnGhost}>Tài liệu</button>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.icon}><FaShopify /></div>
              <div>
                <div className={styles.featureTitle}>Quản lý hàng hóa</div>
                <div>Thêm / sửa / xoá sản phẩm dễ dàng.</div>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}><FaShippingFast /></div>
              <div>
                <div className={styles.featureTitle}>Đơn hàng & giao nhận</div>
                <div>Kiểm soát trạng thái và vận chuyển trong tầm tay.</div>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}><FaThumbsUp /></div>
              <div>
                <div className={styles.featureTitle}>Hỗ trợ & Phản hồi</div>
                <div>Theo dõi trải nghiệm khách hàng nhanh chóng.</div>
              </div>
            </div>
          </div>
        </section>

        <aside className={styles.rightCard}>
          <h3>Truy cập nhanh</h3>
          <ul className={styles.quickList}>
            <li>Danh sách sản phẩm</li>
            <li>Quản lý đơn hàng</li>
            <li>Khuyến mãi & mã giảm giá</li>
            <li>Báo cáo doanh thu</li>
          </ul>
          <div style={{marginTop: '1rem'}}>
            <button className={styles.btnPrimary} style={{width: '100%'}}>Đi tới Dashboard</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
