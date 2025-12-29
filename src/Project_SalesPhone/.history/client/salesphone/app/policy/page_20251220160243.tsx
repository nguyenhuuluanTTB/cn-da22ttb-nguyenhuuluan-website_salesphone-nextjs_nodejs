"use client";
import styles from "./policy.module.scss";

import { FaShieldAlt, FaSyncAlt, FaMoneyBillWave, FaShippingFast, FaLock, FaPhoneAlt, FaFileContract } from "react-icons/fa";
import { MdOutlinePolicy, MdOutlineEmail } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";

export default function PolicyPage() {
  // Danh sách các mục chính sách, mỗi mục là 1 object để render grid
  const policyItems = [
    {
      icon: <FaShieldAlt size={38} color="#A70000" />,
      color: '#A70000',
      bg: '#fff8f8',
      border: '#A70000',
      title: 'Chính sách bán hàng',
      desc: 'SalesPhone cam kết cung cấp sản phẩm điện thoại chính hãng, nguồn gốc rõ ràng, đầy đủ hóa đơn và tem bảo hành.',
      list: [
        'Sản phẩm mới 100%, chưa qua sử dụng',
        'Giá bán niêm yết công khai, minh bạch',
        'Hỗ trợ xuất hóa đơn VAT theo yêu cầu',
      ],
    },
    {
      icon: <FaFileContract size={38} color="#1e90ff" />,
      color: '#1e90ff',
      bg: '#f8fbff',
      border: '#1e90ff',
      title: 'Chính sách bảo hành',
      desc: 'Tất cả sản phẩm được bảo hành chính hãng theo tiêu chuẩn của nhà sản xuất.',
      list: [
        'Thời gian bảo hành: 12 tháng (tùy sản phẩm)',
        'Bảo hành phần cứng do lỗi nhà sản xuất',
        'Không bảo hành các lỗi do rơi vỡ, vào nước, cháy nổ, can thiệp phần mềm',
      ],
    },
    {
      icon: <FaSyncAlt size={38} color="#ff9800" />,
      color: '#ff9800',
      bg: '#fffaf4',
      border: '#ff9800',
      title: 'Chính sách đổi trả',
      desc: 'Khách hàng được hỗ trợ đổi trả sản phẩm trong trường hợp lỗi kỹ thuật.',
      list: [
        'Đổi mới trong vòng 7 ngày đầu tiên',
        'Sản phẩm phải còn nguyên tem, hộp, phụ kiện',
        'Không áp dụng đổi trả do nhu cầu cá nhân',
      ],
    },
    {
      icon: <FaMoneyBillWave size={38} color="#43a047" />,
      color: '#43a047',
      bg: '#f6fff8',
      border: '#43a047',
      title: 'Chính sách thanh toán',
      desc: '',
      list: [
        'Thanh toán tiền mặt tại cửa hàng',
        'Chuyển khoản ngân hàng',
        'Thanh toán qua ví điện tử (Momo, ZaloPay)',
        'Hỗ trợ trả góp 0% qua thẻ tín dụng',
      ],
    },
    {
      icon: <FaShippingFast size={38} color="#ff5722" />,
      color: '#ff5722',
      bg: '#fff7f3',
      border: '#ff5722',
      title: 'Chính sách giao hàng',
      desc: 'SalesPhone hỗ trợ giao hàng nhanh chóng trên toàn quốc.',
      list: [
        'Giao hàng nội thành: 1 – 2 ngày',
        'Giao hàng tỉnh: 3 – 5 ngày',
        'Kiểm tra sản phẩm trước khi thanh toán',
      ],
    },
    {
      icon: <FaLock size={38} color="#6d4aff" />,
      color: '#6d4aff',
      bg: '#f7f6ff',
      border: '#6d4aff',
      title: 'Chính sách bảo mật thông tin',
      desc: 'SalesPhone cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng.',
      list: [
        'Không chia sẻ thông tin cho bên thứ ba',
        'Chỉ sử dụng thông tin để phục vụ mua bán',
        'Dữ liệu được lưu trữ an toàn',
      ],
    },
    {
      icon: <FaPhoneAlt size={38} color="#d32f2f" />,
      color: '#d32f2f',
      bg: '#fff6f6',
      border: '#d32f2f',
      title: 'Thông tin liên hệ',
      desc: 'Nếu có bất kỳ thắc mắc nào liên quan đến chính sách, vui lòng liên hệ:',
      list: [
        <span key="hotline"><FaPhoneAlt style={{color:'#d32f2f',marginRight:6}}/> <b style={{color:'#d32f2f'}}>Hotline: 1900 9999</b></span>,
        <span key="email"><MdOutlineEmail style={{color:'#1e90ff',marginRight:6}}/> <b style={{color:'#1e90ff'}}>Email: support@salesphone.vn</b></span>,
        <span key="store"><BsBoxSeam style={{color:'#A70000',marginRight:6}}/> Hệ thống cửa hàng SalesPhone toàn quốc</span>,
      ],
    },
  ];

  return (
    <section className={styles.policyPage}>
      <div className={styles.container}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24,justifyContent:'center'}}>
          <MdOutlinePolicy size={48} color="#A70000" />
          <div>
            <h1 style={{margin:0, fontSize:'2.5rem', color:'#A70000', fontWeight:900, letterSpacing:1, textShadow:'0 2px 8px #0001'}}>Chính sách & Điều khoản</h1>
            <div style={{color:'#888',fontWeight:600, fontSize:'1.1rem'}}>SalesPhone - An tâm mua sắm, bảo vệ quyền lợi khách hàng</div>
          </div>
        </div>
        <p className={styles.updated} style={{color:'#666',marginBottom:32, textAlign:'center'}}>Cập nhật lần cuối: 2025</p>

        {/* Grid layout responsive */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))',
          gap:'2rem',
          margin:'0 auto',
          maxWidth:1100,
        }}>
          {policyItems.map((item, idx) => (
            <div
              key={idx}
              className={styles.block}
              style={{
                borderLeft:`6px solid ${item.border}`,
                background:item.bg,
                borderRadius:14,
                boxShadow:'0 2px 12px #0001',
                padding:'2rem 1.5rem 1.5rem 1.5rem',
                minHeight:260,
                transition:'transform 0.2s, box-shadow 0.2s',
                display:'flex', flexDirection:'column',
                justifyContent:'flex-start',
                cursor:'default',
                position:'relative',
                overflow:'hidden',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.025)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px #0002';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLDivElement).style.transform = '';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px #0001';
              }}
            >
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:10}}>
                {item.icon}
                <h2 style={{margin:0, fontSize:'1.25rem', color:item.color, fontWeight:800, letterSpacing:0.5}}>{item.title}</h2>
              </div>
              {item.desc && <div style={{color:'#444',marginBottom:10, fontWeight:500}}>{item.desc}</div>}
              <ul style={{marginLeft:18, marginBottom:0, color:'#333', fontSize:'1rem', fontWeight:400, paddingLeft:0, listStyle:'disc'}}>
                {item.list.map((li, i) => (
                  <li key={i} style={{marginBottom:6, lineHeight:1.7}}>{li}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
