"use client";

import styles from "./review.module.scss";

export default function Xiaomi14UltraReview() {
  return (
    <article className={styles.articlePage}>
      <div className={styles.container}>

        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.tag}>Đánh giá</span>
          <h1 className={styles.title}>
            Xiaomi 14 Ultra – Camera Phone đỉnh cao 2025
          </h1>
          <p className={styles.meta}>
            Đăng ngày 20/12/2025 · SalesPhone Review
          </p>
        </header>

        {/* INTRO */}
        <section className={styles.section}>
          <p>
            Xiaomi 14 Ultra là cái tên nổi bật nhất trong phân khúc smartphone
            cao cấp năm 2025. Không chỉ mạnh mẽ về hiệu năng, máy còn được
            đánh giá là một trong những “camera phone” xuất sắc nhất hiện
            nay — đem lại trải nghiệm chụp ảnh và quay video gần như hoàn hảo.
          </p>
        </section>

        {/* CAMERA */}
        <section className={styles.section}>
          <h2 className={styles.heading}>
            Camera – Tinh hoa từ công nghệ hình ảnh
          </h2>
          <p>
            Xiaomi 14 Ultra được trang bị hệ thống camera **hàng đầu thế giới** với
            cảm biến lớn, khả năng thu sáng vượt trội và thuật toán AI tối ưu,
            giúp bạn chụp ảnh sắc nét trong mọi điều kiện ánh sáng, kể cả thiếu sáng.
          </p>
          <p>
            Máy có nhiều chế độ chụp chuyên nghiệp: **Chân dung**, **Night Mode**,
            **Pro Mode**, và **HDR nâng cao**, phù hợp cả người mới và người dùng
            chuyên sâu.
          </p>
        </section>

        {/* DESIGN & DISPLAY */}
        <section className={styles.section}>
          <h2 className={styles.heading}>
            Thiết kế & Màn hình – Hoàn thiện đến từng chi tiết
          </h2>
          <p>
            Xiaomi 14 Ultra sở hữu thiết kế tinh xảo với khung nhôm cao cấp, mặt
            lưng được hoàn thiện tỉ mỉ. Màn hình **AMOLED 2K** với tần số quét
            **120Hz** mang lại trải nghiệm hiển thị mượt mà, màu sắc rực rỡ và độ
            sáng cao trong mọi hoàn cảnh.
          </p>
          <p>
            Viền màn hình được làm siêu mỏng, tạo không gian hiển thị tối ưu
            dành cho xem video, chơi game và duyệt nội dung.
          </p>
        </section>

        {/* PERFORMANCE */}
        <section className={styles.section}>
          <h2 className={styles.heading}>
            Hiệu năng – Mạnh mẽ xử lý mọi tác vụ
          </h2>
          <p>
            Xiaomi 14 Ultra được trang bị chip xử lý **Snapdragon hàng đầu**, 
            kết hợp RAM lớn và tối ưu hệ thống, giúp máy phản hồi nhanh, xử lý
            đa nhiệm hiệu quả và chơi game đồ họa nặng không giật lag.
          </p>
          <p>
            Giao diện MIUI được tinh chỉnh cho trải nghiệm trơn tru, dễ
            tuỳ biến và có nhiều tính năng hữu ích.
          </p>
        </section>

        {/* BATTERY & CONNECTIVITY */}
        <section className={styles.section}>
          <h2 className={styles.heading}>
            Pin & Kết nối – Sức bền cả ngày dài
          </h2>
          <p>
            Với dung lượng pin lớn và khả năng sạc nhanh siêu tốc, Xiaomi 14
            Ultra hỗ trợ bạn sử dụng cả ngày mà không lo hết pin. Sạc không dây
            và sạc ngược cũng là những điểm cộng đáng giá.
          </p>
          <p>
            Máy hỗ trợ 5G, Wi-Fi 6E và Bluetooth phiên bản mới nhất, đảm bảo
            kết nối ổn định mọi lúc.
          </p>
        </section>

        {/* CONCLUSION */}
        <section className={styles.highlight}>
          <h3 className={styles.highlightTitle}>
            Xiaomi 14 Ultra – Tóm tắt ưu điểm
          </h3>
          <ul className={styles.summaryList}>
            <li>✔ Camera xuất sắc, AI tối ưu ảnh/video</li>
            <li>✔ Màn hình AMOLED 2K, 120Hz</li>
            <li>✔ Hiệu năng cực nhanh và ổn định</li>
            <li>✔ Pin bền với sạc nhanh & không dây</li>
            <li>✔ Thiết kế cao cấp, sang trọng</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>
            Xiaomi 14 Ultra hiện có mặt tại hệ thống SalesPhone với các
            phiên bản cấu hình đa dạng. Liên hệ cửa hàng để nhận tư vấn và các
            ưu đãi hấp dẫn.
          </p>
        </footer>

      </div>
    </article>
  );
}
