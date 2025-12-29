"use client";

import styles from "./compare.module.scss";

export default function CompareArticlePage() {
  return (
    <article className={styles.articlePage}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.tag}>So sánh</span>
          <h1 className={styles.title}>
            So sánh iPhone 15 Pro Max vs Samsung Galaxy S24 Ultra
          </h1>
          <p className={styles.meta}>
            Đăng ngày 12/11/2024 · SalesPhone News
          </p>
        </header>

        {/* INTRO */}
        <section className={styles.section}>
          <p>
            Trong phân khúc smartphone cao cấp,{" "}
            <b>iPhone 15 Pro Max</b> và{" "}
            <b>Samsung Galaxy S24 Ultra</b> là hai flagship đáng chú ý nhất hiện
            nay. Một bên đại diện cho hệ sinh thái Apple ổn định, tối ưu sâu; bên
            còn lại là flagship Android mạnh mẽ với AI và bút S Pen độc quyền.
          </p>
        </section>

        {/* DESIGN */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Thiết kế & cảm giác cầm nắm</h2>
          <p>
            iPhone 15 Pro Max sử dụng khung <b>Titanium</b> nhẹ hơn, mang lại cảm
            giác cầm nắm thoải mái, thiết kế tối giản đặc trưng của Apple.
          </p>
          <p>
            Trong khi đó, Galaxy S24 Ultra sở hữu thiết kế vuông vức, mạnh mẽ,
            tích hợp <b>bút S Pen</b> hỗ trợ ghi chú và làm việc chuyên sâu.
          </p>
        </section>

        {/* DISPLAY */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Màn hình hiển thị</h2>
          <p>
            Samsung S24 Ultra nổi bật với màn hình Dynamic AMOLED 2X có độ sáng
            cực cao, hiển thị tốt dưới ánh nắng mạnh.
          </p>
          <p>
            iPhone 15 Pro Max mang lại màu sắc trung thực, dịu mắt, phù hợp cho
            người dùng làm việc và giải trí lâu dài.
          </p>
        </section>

        {/* PERFORMANCE */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Hiệu năng & phần mềm</h2>
          <p>
            iPhone 15 Pro Max được trang bị chip <b>A17 Pro (3nm)</b>, cho hiệu
            năng CPU và GPU hàng đầu, chơi game nặng và chỉnh sửa video mượt mà.
          </p>
          <p>
            Galaxy S24 Ultra sử dụng{" "}
            <b>Snapdragon 8 Gen 3 for Galaxy</b>, kết hợp <b>Galaxy AI</b> giúp
            dịch thuật, chỉnh ảnh, tóm tắt nội dung thông minh.
          </p>
        </section>

        {/* CAMERA */}
        <section className={styles.section}>
          <h2 className={styles.heading}>Camera</h2>
          <p>
            iPhone 15 Pro Max mạnh về quay video, chống rung và màu sắc chân
            thực, phù hợp cho nhà sáng tạo nội dung.
          </p>
          <p>
            Samsung S24 Ultra vượt trội với camera độ phân giải cao và khả năng
            zoom xa, chụp ảnh chi tiết trong nhiều điều kiện ánh sáng.
          </p>
        </section>

        


        {/* SPEC TABLE */}
        <section className={styles.section}>
        <h2 className={styles.heading}>Bảng so sánh thông số kỹ thuật</h2>

        <div className={styles.tableWrapper}>
            <table className={styles.compareTable}>
            <thead>
                <tr>
                <th>Tiêu chí</th>
                <th>iPhone 15 Pro Max</th>
                <th>Samsung Galaxy S24 Ultra</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Màn hình</td>
                <td>6.7" OLED, 120Hz</td>
                <td>6.8" Dynamic AMOLED 2X, 120Hz</td>
                </tr>
                <tr>
                <td>Chip xử lý</td>
                <td>A17 Pro (3nm)</td>
                <td>Snapdragon 8 Gen 3 for Galaxy</td>
                </tr>
                <tr>
                <td>RAM</td>
                <td>8 GB</td>
                <td>12 GB</td>
                </tr>
                <tr>
                <td>Bộ nhớ trong</td>
                <td>256GB – 1TB</td>
                <td>256GB – 1TB</td>
                </tr>
                <tr>
                <td>Camera chính</td>
                <td>48 MP</td>
                <td>200 MP</td>
                </tr>
                <tr>
                <td>Pin</td>
                <td>~4422 mAh</td>
                <td>5000 mAh</td>
                </tr>
                <tr>
                <td>Sạc</td>
                <td>Có dây & MagSafe</td>
                <td>Có dây & sạc không dây</td>
                </tr>
                <tr>
                <td>Tính năng đặc biệt</td>
                <td>iOS, hệ sinh thái Apple</td>
                <td>S Pen, Galaxy AI</td>
                </tr>
            </tbody>
            </table>
        </div>
        </section>

        <section className={styles.section}>
            <h2 className={styles.heading}>So sánh nhanh ưu & nhược điểm</h2>

            <div className={styles.tableWrapper}>
                <table className={styles.compareTable}>
                <thead>
                    <tr>
                    <th></th>
                    <th>iPhone 15 Pro Max</th>
                    <th>Samsung Galaxy S24 Ultra</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Ưu điểm</td>
                    <td>
                        - Quay video xuất sắc<br />
                        - Hiệu năng ổn định<br />
                        - Hệ sinh thái Apple
                    </td>
                    <td>
                        - Camera zoom mạnh<br />
                        - AI thông minh<br />
                        - Bút S Pen
                    </td>
                    </tr>
                    <tr>
                    <td>Nhược điểm</td>
                    <td>Ít tuỳ biến, giá cao</td>
                    <td>Thiết kế to, nặng</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </section>

            {/* CONCLUSION */}
        <section className={styles.highlight}>
          <h3 className={styles.highlightTitle}>Nên chọn máy nào?</h3>
          <ul className={styles.list}>
            <li>✔ Chọn iPhone 15 Pro Max nếu bạn ưu tiên sự ổn định, quay video và hệ sinh thái Apple</li>
            <li>✔ Chọn Samsung S24 Ultra nếu bạn cần AI, bút S Pen và khả năng tuỳ biến cao</li>
          </ul>
        </section>



        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>
            Cả hai sản phẩm hiện đang được phân phối chính hãng tại hệ thống
            SalesPhone với nhiều ưu đãi hấp dẫn. Liên hệ cửa hàng gần nhất để
            được tư vấn chi tiết.
          </p>
        </footer>
      </div>
    </article>
  );
}
