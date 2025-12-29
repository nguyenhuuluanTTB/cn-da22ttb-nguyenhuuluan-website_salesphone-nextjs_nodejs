"use client";
import styles from "./policy.module.scss";

import { FaShieldAlt, FaSyncAlt, FaMoneyBillWave, FaShippingFast, FaLock, FaPhoneAlt, FaFileContract } from "react-icons/fa";
import { MdOutlinePolicy, MdOutlineEmail } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";

export default function PolicyPage() {
  return (
    <section className={styles.policyPage}>
      <div className={styles.container}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
          <MdOutlinePolicy size={40} color="#A70000" />
          <div>
            <h1 style={{margin:0, fontSize:'2.2rem', color:'#A70000', fontWeight:800, letterSpacing:1}}>Chính sách & Điều khoản</h1>
            <div style={{color:'#888',fontWeight:500}}>SalesPhone - An tâm mua sắm, bảo vệ quyền lợi khách hàng</div>
          </div>
        </div>
        <p className={styles.updated} style={{color:'#666',marginBottom:32}}>Cập nhật lần cuối: 2025</p>

        {/* 1. CHÍNH SÁCH BÁN HÀNG */}
        <div className={styles.block} style={{borderLeft:'6px solid #A70000', background:'#fff8f8', marginBottom:28, borderRadius:10, boxShadow:'0 2px 8px #0001'}}>
          <h2 style={{display:'flex',alignItems:'center',gap:10,color:'#A70000'}}><FaShieldAlt/> 1. Chính sách bán hàng</h2>
          <p>SalesPhone cam kết cung cấp sản phẩm điện thoại <b>chính hãng</b>, nguồn gốc rõ ràng, đầy đủ hóa đơn và tem bảo hành.</p>
          <ul style={{marginLeft:20}}>
            <li>Sản phẩm mới 100%, chưa qua sử dụng</li>
            <li>Giá bán niêm yết công khai, minh bạch</li>
            <li>Hỗ trợ xuất hóa đơn VAT theo yêu cầu</li>
          </ul>
        </div>

        {/* 2. CHÍNH SÁCH BẢO HÀNH */}
        <div className={styles.block} style={{borderLeft:'6px solid #1e90ff', background:'#f8fbff', marginBottom:28, borderRadius:10, boxShadow:'0 2px 8px #0001'}}>
          <h2 style={{display:'flex',alignItems:'center',gap:10,color:'#1e90ff'}}><FaFileContract/> 2. Chính sách bảo hành</h2>
          <p>Tất cả sản phẩm được bảo hành <b>chính hãng</b> theo tiêu chuẩn của nhà sản xuất.</p>
          <ul style={{marginLeft:20}}>
            <li>Thời gian bảo hành: 12 tháng (tùy sản phẩm)</li>
            <li>Bảo hành phần cứng do lỗi nhà sản xuất</li>
            <li>Không bảo hành các lỗi do rơi vỡ, vào nước, cháy nổ, can thiệp phần mềm</li>
          </ul>
        </div>

        {/* 3. ĐỔI TRẢ */}
        <div className={styles.block} style={{borderLeft:'6px solid #ff9800', background:'#fffaf4', marginBottom:28, borderRadius:10, boxShadow:'0 2px 8px #0001'}}>
          <h2 style={{display:'flex',alignItems:'center',gap:10,color:'#ff9800'}}><FaSyncAlt/> 3. Chính sách đổi trả</h2>
          <p>Khách hàng được hỗ trợ <b>đổi trả</b> sản phẩm trong trường hợp lỗi kỹ thuật.</p>
          <ul style={{marginLeft:20}}>
            <li>Đổi mới trong vòng 7 ngày đầu tiên</li>
            <li>Sản phẩm phải còn nguyên tem, hộp, phụ kiện</li>
            <li>Không áp dụng đổi trả do nhu cầu cá nhân</li>
          </ul>
        </div>

        {/* 4. THANH TOÁN */}
        <div className={styles.block} style={{borderLeft:'6px solid #43a047', background:'#f6fff8', marginBottom:28, borderRadius:10, boxShadow:'0 2px 8px #0001'}}>
          <h2 style={{display:'flex',alignItems:'center',gap:10,color:'#43a047'}}><FaMoneyBillWave/> 4. Chính sách thanh toán</h2>
          <ul style={{marginLeft:20}}>
            <li>Thanh toán tiền mặt tại cửa hàng</li>
            <li>Chuyển khoản ngân hàng</li>
            <li>Thanh toán qua ví điện tử (Momo, ZaloPay)</li>
            <li>Hỗ trợ trả góp 0% qua thẻ tín dụng</li>
          </ul>
        </div>

        {/* 5. GIAO HÀNG */}
        <div className={styles.block} style={{borderLeft:'6px solid #ff5722', background:'#fff7f3', marginBottom:28, borderRadius:10, boxShadow:'0 2px 8px #0001'}}>
          <h2 style={{display:'flex',alignItems:'center',gap:10,color:'#ff5722'}}><FaShippingFast/> 5. Chính sách giao hàng</h2>
          <p>SalesPhone hỗ trợ giao hàng <b>nhanh chóng</b> trên toàn quốc.</p>
          <ul style={{marginLeft:20}}>
            <li>Giao hàng nội thành: 1 – 2 ngày</li>
            <li>Giao hàng tỉnh: 3 – 5 ngày</li>
            <li>Kiểm tra sản phẩm trước khi thanh toán</li>
          </ul>
        </div>

        {/* 6. BẢO MẬT */}
        <div className={styles.block} style={{borderLeft:'6px solid #6d4aff', background:'#f7f6ff', marginBottom:28, borderRadius:10, boxShadow:'0 2px 8px #0001'}}>
          <h2 style={{display:'flex',alignItems:'center',gap:10,color:'#6d4aff'}}><FaLock/> 6. Chính sách bảo mật thông tin</h2>
          <p>SalesPhone cam kết <b>bảo mật tuyệt đối</b> thông tin cá nhân của khách hàng.</p>
          <ul style={{marginLeft:20}}>
            <li>Không chia sẻ thông tin cho bên thứ ba</li>
            <li>Chỉ sử dụng thông tin để phục vụ mua bán</li>
            <li>Dữ liệu được lưu trữ an toàn</li>
          </ul>
        </div>

        {/* 7. LIÊN HỆ */}
        <div className={styles.block} style={{borderLeft:'6px solid #d32f2f', background:'#fff6f6', marginBottom:28, borderRadius:10, boxShadow:'0 2px 8px #0001'}}>
          <h2 style={{display:'flex',alignItems:'center',gap:10,color:'#d32f2f'}}><FaPhoneAlt/> 7. Thông tin liên hệ</h2>
          <p>Nếu có bất kỳ thắc mắc nào liên quan đến chính sách, vui lòng liên hệ:</p>
          <ul style={{marginLeft:20, fontWeight:500}}>
            <li><FaPhoneAlt style={{color:'#d32f2f',marginRight:6}}/> <span style={{color:'#d32f2f'}}>Hotline: 1900 9999</span></li>
            <li><MdOutlineEmail style={{color:'#1e90ff',marginRight:6}}/> <span style={{color:'#1e90ff'}}>Email: support@salesphone.vn</span></li>
            <li><BsBoxSeam style={{color:'#A70000',marginRight:6}}/> Hệ thống cửa hàng SalesPhone toàn quốc</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
