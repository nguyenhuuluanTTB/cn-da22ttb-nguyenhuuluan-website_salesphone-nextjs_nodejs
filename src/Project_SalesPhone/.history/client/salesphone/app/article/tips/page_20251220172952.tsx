"use client";

import styles from "./tips.module.scss";

export default function AndroidBatteryTipsArticle() {
  return (
    <article className={styles.articlePage}>
      <div className={styles.container}>

        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.tag}>Thủ thuật Android</span>
          <h1 className={styles.title}>
            10 mẹo tối ưu pin cho điện thoại Android – Dùng cả ngày không lo hết pin
          </h1>
          <p className={styles.meta}>
            Cập nhật 12/2024 · SalesPhone Blog
          </p>
        </header>

        {/* INTRO */}
        <section className={styles.section}>
          <p>
            Pin luôn là mối quan tâm hàng đầu của người dùng Android. Dù sở hữu
            dung lượng pin lớn, nhưng nếu không tối ưu đúng cách, điện thoại
            vẫn có thể tụt pin nhanh chóng. Dưới đây là <b>10 mẹo đơn giản nhưng
            cực kỳ hiệu quả</b> giúp bạn kéo dài thời gian sử dụng pin mỗi ngày.
          </p>
        </section>

        {/* TIP LIST */}
        <section className={styles.section}>
          <h2 className={styles.heading}>1. Giảm độ sáng màn hình</h2>
          <p>
            Màn hình là thành phần tiêu thụ pin nhiều nhất. Hãy giảm độ sáng
            hoặc bật <b>Adaptive Brightness</b> để máy tự điều chỉnh theo môi trường.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>2. Tắt các kết nối không cần thiết</h2>
          <p>
            Wi-Fi, Bluetooth, GPS hay NFC nếu bật liên tục sẽ làm hao pin.
            Chỉ nên bật khi thật sự cần sử dụng.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>3. Bật chế độ tiết kiệm pin</h2>
          <p>
            Chế độ tiết kiệm pin giúp hạn chế tiến trình nền, giảm hiệu năng
            và kéo dài thời gian sử dụng khi pin yếu.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>4. Kiểm soát ứng dụng chạy nền</h2>
          <p>
            Một số ứng dụng mạng xã hội hoặc game có thể chạy nền liên tục.
            Hãy kiểm tra trong phần <b>Battery Usage</b> và hạn chế các app tiêu thụ pin nhiều.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>5. Tắt rung và phản hồi xúc giác</h2>
          <p>
            Rung tiêu tốn pin nhiều hơn bạn nghĩ. Nếu không cần thiết,
            hãy tắt rung khi gõ phím hoặc nhận thông báo.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>6. Sử dụng Dark Mode</h2>
          <p>
            Với màn hình AMOLED, Dark Mode giúp tiết kiệm pin đáng kể
            vì các điểm ảnh màu đen gần như không tiêu thụ năng lượng.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>7. Cập nhật hệ điều hành thường xuyên</h2>
          <p>
            Các bản cập nhật Android mới thường đi kèm tối ưu pin và hiệu năng,
            giúp máy hoạt động ổn định và tiết kiệm năng lượng hơn.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>8. Tắt thông báo không quan trọng</h2>
          <p>
            Mỗi thông báo đều làm màn hình sáng lên và tiêu tốn pin.
            Hãy tắt bớt thông báo từ các ứng dụng không cần thiết.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>9. Không sạc pin qua đêm</h2>
          <p>
            Việc sạc pin quá lâu có thể làm pin chai nhanh hơn.
            Hãy rút sạc khi pin đạt khoảng 80–90% nếu có thể.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>10. Khởi động lại máy định kỳ</h2>
          <p>
            Khởi động lại giúp giải phóng RAM, tắt các tiến trình lỗi và
            giúp máy hoạt động mượt mà, tiết kiệm pin hơn.
          </p>
        </section>

        {/* HIGHLIGHT */}
        <section className={styles.highlight}>
          <h3 className={styles.highlightTitle}>
            Tổng kết nhanh
          </h3>
          <ul className={styles.summaryList}>
            <li>✔ Giảm độ sáng và dùng Dark Mode</li>
            <li>✔ Hạn chế ứng dụng chạy nền</li>
            <li>✔ Tắt kết nối & thông báo không cần thiết</li>
            <li>✔ Sạc pin đúng cách để pin bền hơn</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>
            Áp dụng các mẹo trên sẽ giúp điện thoại Android của bạn hoạt động
            ổn định hơn và kéo dài thời gian sử dụng pin đáng kể.
            Đừng quên theo dõi SalesPhone để cập nhật thêm nhiều thủ thuật hay.
          </p>
        </footer>

      </div>
    </article>
  );
}
