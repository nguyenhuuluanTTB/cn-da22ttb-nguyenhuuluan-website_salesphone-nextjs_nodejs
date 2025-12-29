const { sequelize } = require('../config/database');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const searchService = require('../service/searchService');
const getAllPromotions = require('../service/promotionService');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/* =========================
   GET GEMINI MODEL
========================= */
async function getAvailableModel() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    );

    const models = res.data.models || [];
    const priority = [
      'models/gemini-2.5-flash',
      'models/gemini-2.0-flash',
      'models/gemini-pro-latest'
    ];

    for (const m of priority) {
      if (models.find(x => x.name === m)) return m;
    }

    return models.find(m =>
      m.supportedGenerationMethods?.includes('generateContent')
    )?.name || null;

  } catch (err) {
    console.error('MODEL ERROR:', err.message);
    return null;
  }
}

/* =========================
   GET FULL PRODUCT DATA (FIXED)
========================= */
async function getAllPhonesFull() {
  const [rows] = await sequelize.query(`
    SELECT
      p.id_product,
      CONCAT('P', LPAD(p.id_product, 4, '0')) AS product_code,
      p.name_product,
      p.price,
      p.brand,
      p.type,
      p.status,
      p.quantity,

      d.color,
      d.ram,
      d.rom,
      d.battery,
      d.cpu_detail,
      d.operating_system,

      pr.name_promotion,
      pr.start_at,
      pr.end_at,
      pr.describe_promotion,
      pr.percent,

      GROUP_CONCAT(
        DISTINCT pi.image_url
        ORDER BY pi.is_main DESC
        SEPARATOR ','
      ) AS images

    FROM product p
    LEFT JOIN detail_product d ON p.id_product = d.id_product
    LEFT JOIN promotion pr ON p.id_promotion = pr.id_promotion
    LEFT JOIN product_image pi ON p.id_product = pi.id_product
    GROUP BY p.id_product
  `);

  return rows;
}

/* =========================
   FALLBACK HTML (CARD + IMAGE + LINK)
========================= */
function formatPhonesHTML(phones) {
  return phones.map(p => {
    const img = p.image;
    const link = `http://localhost:3000/home/detail_product/${p.code}`;
    const stockText = p.quantity > 0 ? 'Còn hàng' : 'Hết hàng';
    const stockColor = p.quantity > 0 ? '#16a34a' : '#dc2626';

    return `
<div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin:10px 0;background:#fff;font-family:sans-serif">
  <div style="display:flex;gap:12px">
    <img src="${img}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid #f1f5f9"/>
    <div style="flex:1">
      <h3 style="margin:0 0 4px;font-size:15px;font-weight:600">${p.name}</h3>
      <div style="color:#dc2626;font-weight:700">${Number(p.price).toLocaleString()}₫</div>
      <div style="font-size:12px;color:#64748b">
        ${p.ram}/${p.rom} • ${p.color}<br/>
        Chip: ${p.chip}
      </div>
    </div>
  </div>
  <div style="margin-top:8px;display:flex;justify-content:space-between">
    <span style="color:${stockColor};font-size:12px">● ${stockText}</span>
    <a href="${link}" target="_blank"
       style="background:#2563eb;color:#fff;padding:5px 10px;border-radius:6px;font-size:12px;text-decoration:none">
       Xem chi tiết
    </a>
  </div>
</div>`;
  }).join('');
}

/* =========================
   CHAT API
========================= */
exports.chat = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Missing prompt' });

  try {
    console.log(`💬 Chat request: "${prompt}"`);
    const searchResults = await searchService.searchProducts({ q: prompt });
    console.log(`🔎 Found ${searchResults?.length || 0} products from search`);

    let products = searchResults?.length
      ? searchResults.slice(0, 6)
      : (await getAllPhonesFull()).slice(0, 6);

    // Fetch promotions from DB and prepare simple list for the model
    const rawPromotions = (await getAllPromotions()) || [];
    const promotionsForContext = rawPromotions.map(pr => ({
      id: pr.id_promotion || pr.id || null,
      name: pr.name_promotion || pr.name || null,
      start_at: pr.start_at || pr.startAt || null,
      end_at: pr.end_at || pr.endAt || null,
      description: pr.describe_promotion || pr.description || pr.describe || null,
      percent: pr.percent || null
    }));

    const phonesForContext = products.map(p => ({
      code: p.product_code,
      name: p.name_product,
      price: p.price,
      brand: p.brand,
      type: p.type,
      color: p.color,
      ram: p.ram,
      rom: p.rom,
      chip: p.cpu_detail,
      battery: p.battery ? `${p.battery} mAh` : 'Không rõ',
      os: p.operating_system || 'Không rõ',
      status: p.status,
      quantity: p.quantity,
      promotion: p.name_promotion ? {
        name: p.name_promotion,
        percent: p.percent ? `${p.percent}%` : null,
        description: p.describe_promotion
      } : 'No special promotion',
      image: p.image_url || (p.images ? p.images.split(',')[0] : null),
      link: `http://localhost:3000/home/detail_product/${p.product_code}`
    }));

    const modelName = await getAvailableModel();
    console.log(`🤖 Using model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });

    const context = `
Bạn là Trợ lý bán hàng thông minh của cửa hàng điện thoại SalesPhone (Vietnamese).
Nhiệm vụ của bạn là tư vấn cho khách hàng dựa trên danh sách sản phẩm bên dưới.

THÔNG TIN CỬA HÀNG:
- Email: salesphone.contact@gmail.com
- Số điện thoại: 0901 234 567
- Website: <a href="http://localhost:3000" target="_blank">salesphone.vn</a>
- Xem <a href="http://localhost:3000/store/branches" target="_blank">danh sách chi nhánh</a> hoặc <a href="http://localhost:3000/policy" target="_blank">chính sách mua hàng</a> để biết thêm chi tiết.
- Hỗ trợ khách hàng từ 8h00 - 21h00 hàng ngày.

HƯỚNG DẪN CHỌN SẢN PHẨM:
- Bạn có thể hỏi về thương hiệu (ví dụ: iPhone, Samsung...), tầm giá (ví dụ: dưới 10 triệu), cấu hình (pin, RAM, camera...), hoặc các chương trình khuyến mãi.
- Nếu cần tư vấn chi tiết, hãy mô tả nhu cầu sử dụng (chơi game, chụp ảnh, pin trâu, giá rẻ...).
- Để xem chi tiết sản phẩm, nhấn vào nút "Xem ngay" trên mỗi card sản phẩm.

QUY ĐỊNH LIÊN KẾT:
- Khi trả lời về chi nhánh hoặc chính sách, LUÔN chèn link HTML đến trang chi nhánh (<a href="http://localhost:3000/store/branches" target="_blank">Chi nhánh</a>) hoặc chính sách (<a href="http://localhost:3000/policy" target="_blank">Chính sách</a>).
- Nếu khách hỏi về liên hệ, cung cấp email và số điện thoại trên.

LƯU Ý AN TOÀN:
- Không chia sẻ thông tin cá nhân, mã OTP, hoặc chuyển khoản ngoài tài khoản chính thức của cửa hàng.

DANH SÁCH SẢN PHẨM KHẢ DỤNG:
${JSON.stringify(phonesForContext, null, 2)}

  DANH SÁCH KHUYẾN MÃI (PROMOTIONS) HIỆN CÓ:
  ${JSON.stringify(promotionsForContext, null, 2)}

  THANH TOÁN (PAYMENT METHODS):
  - COD: Thanh toán khi nhận hàng (Cash on Delivery). Khách có thể trả tiền mặt hoặc chuyển khoản trước nếu muốn; nhân viên giao hàng sẽ thu tiền tại địa điểm giao.
  - CHUYỂN KHOẢN: Khách chuyển khoản trước vào tài khoản ngân hàng của cửa hàng. Sau khi nhận được xác nhận thanh toán, cửa hàng sẽ tiến hành đóng hàng và gửi.

  ĐIỀU KHOẢN & CHÍNH SÁCH (POLICIES):
  - Đổi trả: Chấp nhận đổi trả nếu sản phẩm lỗi do nhà sản xuất trong vòng 7 ngày kể từ khi nhận hàng (khách cần giữ nguyên bao bì và kèm hóa đơn).
  - Bảo hành: Áp dụng chính sách bảo hành theo nhà sản xuất (thường 12 tháng cho điện thoại); nếu có bảo hành cửa hàng, sẽ ghi rõ trong mô tả sản phẩm.
  - Vận chuyển: Đơn hàng được xử lý trong vòng 24-48 giờ (trừ ngày nghỉ/thiết lập khác).

QUY ĐỊNH TRÌNH BÀY CHÍNH SÁCH & THANH TOÁN:
- Khi trả lời về chính sách, điều khoản, hoặc phương thức thanh toán, BẮT BUỘC trình bày bằng HTML rõ ràng, dễ đọc, có tiêu đề, gạch đầu dòng, nhóm từng mục. KHÔNG trả về text thuần hoặc markdown.
- Ví dụ:
<div style="background:#f8fafc;border-radius:10px;padding:16px 18px;margin:12px 0 18px 0;font-family:sans-serif">
  <h4 style="color:#2563eb;margin:0 0 8px 0">Chính sách SalesPhone</h4>
  <ul style="margin:0 0 8px 18px;padding:0;font-size:15px">
    <li><b>Thanh toán:</b> <ul><li>COD: ...</li><li>Chuyển khoản: ...</li></ul></li>
    <li><b>Đổi trả:</b> ...</li>
    <li><b>Bảo hành:</b> ...</li>
    <li><b>Vận chuyển:</b> ...</li>
  </ul>
</div>
- Luôn dùng <ul>, <li>, <b>, <h4>... để nhóm và làm nổi bật từng chính sách.

HƯỚNG DẪN HIỂU DỮ LIỆU & TRẢ LỜI:
1. **Phân tích Ý định**: 
   - Nếu khách tìm theo thương hiệu (ví dụ: "iPhone", "Samsung", "Oppo"): Tìm trong trường 'brand' hoặc 'name'.
   - Nếu khách tìm theo giá (ví dụ: "rẻ nhất", "dưới 20 triệu"): So sánh trường 'price'.
   - Nếu khách hỏi về cấu hình (ví dụ: "pin trâu", "ram mạnh"): Kiểm tra 'battery', 'ram', 'chip'.
   - Nếu khách hỏi về khuyến mãi: Kiểm tra trường 'promotion'.

2. **Quy tắc Trò chuyện**:
   - Luôn chào hỏi thân thiện và trả lời lịch sự. Bắt đầu câu trả lời bằng một lời chào hoặc xác nhận ý định của khách.
   - Nếu khách chào hỏi: Trả lời thân thiện và giới thiệu ngắn gọn bạn có thể giúp gì (tìm máy, check giá, tư vấn cấu hình).
   - **Tư vấn thông minh**: Nếu khách hỏi chung chung (ví dụ: "điện thoại nào tốt"), hãy gợi ý 2-3 mẫu máy bán chạy hoặc có cấu hình mạnh nhất trong danh sách.
   - **So sánh**: Khi giới thiệu nhiều máy, hãy nêu bật sự khác biệt (ví dụ: "Máy A pin tốt hơn, máy B giá rẻ hơn").

3. **Xử lý Dữ liệu thực tế**:
   - NẾU 'quantity' <= 0: Phải nói rõ là "Hiện tại mẫu này đang tạm hết hàng" và gợi ý sang mẫu khác còn hàng.
   - NẾU sản phẩm có 'promotion' (khác 'No special promotion'): Hãy nhấn mạnh ưu đãi này để kích thích mua hàng.
   - Giá tiền: Luôn hiển thị đầy đủ đơn vị ₫ và định dạng chuẩn (ví dụ: 19.990.000₫).

4. **Định dạng Sản phẩm**: 
   - Khi giới thiệu sản phẩm nào đó, BẮT BUỘC dùng template HTML sau. KHÔNG sử dụng Markdown cho card sản phẩm.
   - Mỗi câu trả lời không nên hiện quá 4 card để tránh làm loãng thông tin.

TEMPLATE HTML CARD (SỬ DỤNG KHI HIỂN THỊ SẢN PHẨM):
<div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin:10px 0;background:#fff;font-family:sans-serif;box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)">
  <div style="display:flex;gap:12px">
    <img src="{image}" style="width:100px;height:100px;object-fit:cover;border-radius:8px;border:1px solid #f1f5f9"/>
    <div style="flex:1">
      <h3 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1e293b">{name}</h3>
      <div style="color:#dc2626;font-weight:800;font-size:15px;margin-bottom:4px">{price}₫</div>
      <div style="font-size:12px;color:#475569;line-height:1.5">
        <b>Cấu hình:</b> {ram}/{rom} • {color}<br/>
        <b>Chip:</b> {chip} • <b>Pin:</b> {battery}
      </div>
      {promotion_html}
    </div>
  </div>
  <div style="margin-top:10px;padding-top:10px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center">
    <span style="color:#059669;font-size:12px;font-weight:600">● {status} ({quantity} máy)</span>
    <a href="{link}" target="_blank" style="background:#2563eb;color:#fff;padding:6px 14px;border-radius:8px;font-size:13px;text-decoration:none;font-weight:600">Xem ngay</a>
  </div>
</div>

*Lưu ý: {promotion_html} có thể là: <div style="font-size:11px;color:#f59e0b;margin-top:4px">🎁 Ưu đãi: {promotion_name}</div> nếu có.*

CÂU HỎI TỪ KHÁCH: "${prompt}"
`;

    const result = await model.generateContent(context);
    const reply = result.response.text();

    res.json({ reply, source: 'gemini' });

  } catch (err) {
    console.error('❌ CHAT ERROR:', err);
    res.json({
      reply: `Hệ thống gặp lỗi: ${err.message}`,
      error: err.message,
      stack: err.stack
    });
  }
};


/* =========================
   TEST API
========================= */
exports.testGemini = async (req, res) => {
  try {
    const modelName = await getAvailableModel();
    if (!modelName) throw new Error("No available generative model found");

    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Reply only: OK");

    res.json({
      status: "SUCCESS",
      reply: result.response.text(),
      model: modelName
    });
  } catch (err) {
    res.status(500).json({ status: "FAIL", error: err.message });
  }
};
