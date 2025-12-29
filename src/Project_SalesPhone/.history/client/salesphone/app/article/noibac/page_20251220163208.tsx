"use client";

import styles from "./promo.module.scss";
import Link from "next/link";

export default function Promo1111Page() {
  return (
    <section className={styles.promoPage}>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>LỄ ĐỘC THÂN 11.11</span>
          <h1>iPhone 16 Pro ra mắt</h1>
          <p>
            Apple chính thức giới thiệu iPhone 16 Pro với hàng loạt nâng cấp mạnh
            mẽ: chip A18 Pro, camera AI thông minh, pin tối ưu và thiết kế cao
            cấp hơn bao giờ hết.
          </p>

          <div className={styles.cta}>
            <span className={styles.sale}>Giảm đến 50%</span>
            <Link href="/home">
              <button>Xem sản phẩm</button>
            </Link>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.container}>
        {/* SECTION 1 */}
        <div className={styles.section}>
          <h2>Những nâng cấp nổi bật trên iPhone 16 Pro</h2>
          <ul>
            <li>
              <b>Chip A18 Pro</b> – Hiệu năng vượt trội, tiết kiệm pin hơn thế hệ
              trước.
            </li>
            <li>
              <b>Camera AI</b> – Tự động tối ưu ánh sáng, chân dung và quay video
              chuyên nghiệp.
            </li>
            <li>
              <b>Màn hình ProMotion</b> – 120Hz mượt mà, hiển thị sắc nét.
            </li>
            <li>
              <b>Thiết kế khung titan</b> – Nhẹ, bền và sang trọng.
            </li>
          </ul>
        </div>

        {/* SECTION 2 */}
        <div className={styles.sectionHighlight}>
          <h2>Ưu đãi độc quyền tại SalesPhone</h2>
          <div className={styles.benefits}>
            <div className={styles.benefitItem}>
              ✔ Giảm giá lên đến <b>50%</b> trong ngày 11.11
            </div>
            <div className={styles.benefitItem}>
              ✔ Sản phẩm <b>chính hãng 100%</b>, đầy đủ bảo hành Apple
            </div>
            <div className={styles.benefitItem}>
              ✔ Hỗ trợ <b>trả góp 0%</b>, thủ tục nhanh gọn
            </div>
            <div className={styles.benefitItem}>
              ✔ Giao hàng nhanh toàn quốc
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className={styles.section}>
          <h2>Lưu ý chương trình</h2>
          <p>
            Chương trình áp dụng từ <b>08/11 – 11/11</b> hoặc đến khi hết số lượng.
            Giá ưu đãi có thể thay đổi theo từng phiên bản bộ nhớ và màu sắc.
          </p>
          <p>
            SalesPhone cam kết minh bạch giá bán, không phát sinh chi phí ẩn.
          </p>
        </div>
      </div>
    </section>
  );
}
