"use client";
import styles from "./policy.module.scss";

export default function PolicyPage() {
  return (
    <section className={styles.policyPage}>
      <div className={styles.container}>
        <h1>Chính sách & Điều khoản - SalesPhone</h1>
        <p className={styles.updated}>Cập nhật lần cuối: 2025</p>

        {/* 1. CHÍNH SÁCH BÁN HÀNG */}
        <div className={styles.block}>
          <h2>1. Chính sách bán hàng</h2>
          <p>
            SalesPhone cam kết cung cấp sản phẩm điện thoại chính hãng, có nguồn
            gốc rõ ràng, đầy đủ hóa đơn và tem bảo hành.
          </p>
          <ul>
            <li>Sản phẩm mới 100%, chưa qua sử dụng</li>
            <li>Giá bán niêm yết công khai, minh bạch</li>
            <li>Hỗ trợ xuất hóa đơn VAT theo yêu cầu</li>
          </ul>
        </div>

        {/* 2. CHÍNH SÁCH BẢO HÀNH */}
        <div className={styles.block}>
          <h2>2. Chính sách bảo hành</h2>
          <p>
            Tất cả sản phẩm được bảo hành chính hãng theo tiêu chuẩn của nhà sản
            xuất.
          </p>
          <ul>
            <li>Thời gian bảo hành: 12 tháng (tùy sản phẩm)</li>
            <li>Bảo hành phần cứng do lỗi nhà sản xuất</li>
            <li>
              Không bảo hành các lỗi do rơi vỡ, vào nước, cháy nổ, can thiệp phần
              mềm
            </li>
          </ul>
        </div>

        {/* 3. ĐỔI TRẢ */}
        <div className={styles.block}>
          <h2>3. Chính sách đổi trả</h2>
          <p>
            Khách hàng được hỗ trợ đổi trả sản phẩm trong trường hợp lỗi kỹ
            thuật.
          </p>
          <ul>
            <li>Đổi mới trong vòng 7 ngày đầu tiên</li>
            <li>Sản phẩm phải còn nguyên tem, hộp, phụ kiện</li>
            <li>Không áp dụng đổi trả do nhu cầu cá nhân</li>
          </ul>
        </div>

        {/* 4. THANH TOÁN */}
        <div className={styles.block}>
          <h2>4. Chính sách thanh toán</h2>
          <ul>
            <li>Thanh toán tiền mặt tại cửa hàng</li>
            <li>Chuyển khoản ngân hàng</li>
            <li>Thanh toán qua ví điện tử (Momo, ZaloPay)</li>
            <li>Hỗ trợ trả góp 0% qua thẻ tín dụng</li>
          </ul>
        </div>

        {/* 5. GIAO HÀNG */}
        <div className={styles.block}>
          <h2>5. Chính sách giao hàng</h2>
          <p>
            SalesPhone hỗ trợ giao hàng nhanh chóng trên toàn quốc.
          </p>
          <ul>
            <li>Giao hàng nội thành: 1 – 2 ngày</li>
            <li>Giao hàng tỉnh: 3 – 5 ngày</li>
            <li>Kiểm tra sản phẩm trước khi thanh toán</li>
          </ul>
        </div>

        {/* 6. BẢO MẬT */}
        <div className={styles.block}>
          <h2>6. Chính sách bảo mật thông tin</h2>
          <p>
            SalesPhone cam kết bảo mật tuyệt đối thông tin cá nhân của khách
            hàng.
          </p>
          <ul>
            <li>Không chia sẻ thông tin cho bên thứ ba</li>
            <li>Chỉ sử dụng thông tin để phục vụ mua bán</li>
            <li>Dữ liệu được lưu trữ an toàn</li>
          </ul>
        </div>

        {/* 7. LIÊN HỆ */}
        <div className={styles.block}>
          <h2>7. Thông tin liên hệ</h2>
          <p>
            Nếu có bất kỳ thắc mắc nào liên quan đến chính sách, vui lòng liên
            hệ:
          </p>
          <ul>
            <li>Hotline: 1900 9999</li>
            <li>Email: support@salesphone.vn</li>
            <li>Hệ thống cửa hàng SalesPhone toàn quốc</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
