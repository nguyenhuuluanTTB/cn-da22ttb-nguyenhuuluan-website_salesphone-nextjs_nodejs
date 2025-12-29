"use client";

import styles from "./galaxy.module.scss";
import galaxy from './media/galaxy.jpg';
import camera from './media/camera.jpeg';
import chip from './media/camera.jpeg';
import Image from "next/image";

export default function GalaxyZFold6Review() {
  return (
    <article className={styles.articlePage}>
      <div className={styles.container}>

        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.tag}>Đánh giá</span>
          <h1 className={styles.title}>Galaxy Z Fold 6 – Smartphone gập tốt nhất 2024</h1>
          <p className={styles.meta}>
            Đăng ngày 25/11/2025 · SalesPhone Review
          </p>
        </header>

        {/* INTRO */}
        <section className={styles.section}>
          <p>
            Trong năm 2024, thị trường smartphone gập tiếp tục tăng tốc với sự xuất
            hiện của Galaxy Z Fold 6 – chiếc điện thoại gập được đánh giá là “tốt
            nhất” hiện nay. Với sự kết hợp giữa công nghệ màn hình gập tiên tiến,
            hiệu năng đỉnh cao và trải nghiệm đa nhiệm chưa từng có, Z Fold 6 chính
            là lựa chọn hàng đầu nếu bạn muốn bước vào tương lai di động thực thụ.
          </p>
          <Image src = {galaxy} alt="" width={500} height={500}/>
        </section>

        {/* DESIGN & DISPLAY */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Thiết kế & Màn hình – Sang trọng và đột phá</h2>
          <p>
            Galaxy Z Fold 6 tiếp tục phát huy thế mạnh thiết kế gập mở linh hoạt. Khi
            mở ra, bạn có màn hình lớn như tablet, lý tưởng cho xem phim, multitask
            và đọc tài liệu. Khi gập lại, máy vẫn mỏng, đầm tay và dễ mang theo.
          </p>
          <p>
            Màn hình Dynamic AMOLED 2X với tần số quét 120Hz cho màu sắc rực rỡ,
            chuyển động mượt mà và khả năng bảo vệ màn hình gập tối ưu hơn thế
            hệ trước.
          </p>
        </section>

        {/* PERFORMANCE */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Hiệu năng – Mạnh mẽ cho tất cả tác vụ</h2>
          <p>
            Được trang bị chip tối tân, Galaxy Z Fold 6 xử lý mượt mà mọi tác vụ từ lướt
            web, xem video đến chơi game nặng và làm việc đa nhiệm. RAM lớn cùng hệ
            thống quản lý bộ nhớ thông minh giúp ứng dụng luôn sẵn sàng khi bạn cần.
          </p>
          <p>
            Trải nghiệm đa nhiệm trên màn hình lớn là điểm nổi bật nhất của Z Fold 6.
            Bạn có thể mở nhiều cửa sổ cùng lúc — xem video, soạn email, và duyệt web
            không hề chật chội.
          </p>
          <Image src = {chip} alt="" width={500} height={500}/>
        </section>

        {/* CAMERA */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Camera – Đa năng cho mọi khoảnh khắc</h2>
          <p>
            Galaxy Z Fold 6 không chỉ là smartphone gập đỉnh cao về phần cứng mà còn
            gây ấn tượng với hệ thống camera. Máy có camera chính chất lượng cao,
            hỗ trợ quay video 4K/8K, chụp ảnh trong điều kiện thiếu sáng tốt và zoom
            linh hoạt.
          </p>
          <p>
            Chế độ chụp chân dung, selfie đa góc cùng hỗ trợ AI giúp ảnh luôn sắc
            nét và sống động.
          </p>
          <Image src = {camera} alt="" width={500} height={500}/>
        </section>

        {/* BATTERY & CONNECTIVITY */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Pin & Kết nối – Sẵn sàng cả ngày</h2>
          <p>
            Với dung lượng pin lớn, thời lượng sử dụng cả ngày là điều hoàn toàn có
            thể với Z Fold 6. Hỗ trợ sạc nhanh và sạc không dây giúp bạn luôn sẵn
            sàng tiếp tục công việc.
          </p>
          <p>
            Hỗ trợ 5G, Wi-Fi 6E và Bluetooth mới nhất đảm bảo kết nối tốc độ cao mọi
            lúc mọi nơi.
          </p>
        </section>

        {/* CONCLUSION */}
        <section className={styles.highlight}>
          <h3 className={styles.highlightTitle}>Galaxy Z Fold 6 – Có gì nổi bật?</h3>
          <ul className={styles.summaryList}>
            <li>✔ Màn hình gập lớn, trải nghiệm như tablet</li>
            <li>✔ Hiệu năng đỉnh cao, xử lý đa nhiệm mượt mà</li>
            <li>✔ Camera chất lượng, quay video sắc nét</li>
            <li>✔ Pin bền, hỗ trợ sạc nhanh & không dây</li>
            <li>✔ Thiết kế cao cấp, linh hoạt khi gập/ mở</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>
            Galaxy Z Fold 6 đang được bán chính hãng tại hệ thống SalesPhone với
            nhiều ưu đãi hấp dẫn. Liên hệ các chi nhánh để được tư vấn chi tiết và
            trải nghiệm trực tiếp sản phẩm.
          </p>
        </footer>
      </div>
    </article>
  );
}
