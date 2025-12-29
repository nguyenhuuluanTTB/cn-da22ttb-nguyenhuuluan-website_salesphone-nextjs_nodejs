"use client";

import styles from "./noibac.module.scss";
import chipA18_pro from './media/chipA18_pro.jpg';
import camera from './media/camera.jpg';
import Image from "next/image";

export default function Iphone16ProArticle() {
  return (
    <article className={styles.articlePage}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.tag}>Khuyến mãi 11.11</span>
          <h1>iPhone 16 Pro ra mắt – quá nhiều nâng cấp đáng giá</h1>
          <p className={styles.meta}>
            Đăng ngày 12/11/2024 · SalesPhone News
          </p>
        </header>

        {/* INTRO */}
        <section className={styles.section}>
          <p>
            Trong sự kiện ra mắt cuối năm, Apple chính thức giới thiệu{" "}
            <b>iPhone 16 Pro</b> – thế hệ iPhone mang đến bước nhảy vọt về hiệu
            năng, camera và trải nghiệm người dùng. Đặc biệt, tại SalesPhone,
            iPhone 16 Pro đang được áp dụng chương trình ưu đãi lớn nhân dịp{" "}
            <b>11.11</b>, giảm giá lên đến <b>50%</b>.
          </p>
        </section>

        {/* CONTENT */}
        <section className={styles.section}>
          <h2>Chip A18 Pro – Hiệu năng vượt trội</h2>
          <p>
            iPhone 16 Pro được trang bị chip <b>A18 Pro</b> sản xuất trên tiến
            trình mới, mang lại hiệu suất CPU và GPU mạnh hơn đáng kể so với thế
            hệ trước. Điều này giúp máy xử lý mượt mà các tác vụ nặng như chơi
            game đồ họa cao, chỉnh sửa video hay đa nhiệm liên tục.
          </p>

          <Image src={chipA18_pro} alt="" width={500} height={500}/>
        </section>

        <section className={styles.section}>
          <h2>Camera thông minh với AI</h2>
          <p>
            Hệ thống camera trên iPhone 16 Pro được Apple nâng cấp mạnh với khả
            năng xử lý hình ảnh bằng AI. Camera tự động nhận diện bối cảnh,
            khuôn mặt, ánh sáng để cho ra hình ảnh sắc nét, màu sắc chân thực
            hơn, đặc biệt trong điều kiện thiếu sáng.
          </p>
          <Image src={chipA18_pro} alt="" width={500} height={500}/>
        </section>

        <section className={styles.section}>
          <h2>Màn hình & thiết kế cao cấp</h2>
          <p>
            Màn hình ProMotion 120Hz tiếp tục được cải tiến, cho trải nghiệm vuốt
            chạm mượt mà và tiết kiệm pin hơn. Thiết kế khung titan giúp máy nhẹ
            hơn nhưng vẫn đảm bảo độ bền và vẻ ngoài sang trọng.
          </p>
        </section>

        {/* PROMO */}
        <section className={styles.promoBox}>
          <h3>Ưu đãi 11.11 tại SalesPhone</h3>
          <ul>
            <li>🔥 Giảm giá lên đến 50%</li>
            <li>✔ Sản phẩm chính hãng, bảo hành Apple</li>
            <li>✔ Trả góp 0%, hỗ trợ nhanh chóng</li>
            <li>✔ Giao hàng toàn quốc</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>
            Chương trình áp dụng trong thời gian có hạn. Để biết thêm chi tiết,
            vui lòng liên hệ hệ thống cửa hàng SalesPhone hoặc truy cập website
            chính thức.
          </p>
        </footer>
      </div>
    </article>
  );
}
