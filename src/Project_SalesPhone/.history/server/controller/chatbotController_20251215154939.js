const { sequelize } = require('../config/database');
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Lấy model Gemini khả dụng
 */
async function getAvailableModel() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    );

    const model = res.data.models?.find(m => m.supportedGenerationMethods?.includes("generateContent"));
    return model?.name || null;
  } catch (err) {
    console.error("❌ GET MODELS FAIL:", err.message);
    return null;
  }
}

/**
 * Lấy dữ liệu sản phẩm
 */
async function getAllPhones() {
  const [rows] = await sequelize.query(`
    SELECT 
      p.id_product,
      p.name_product AS name,
      p.price,
      p.brand,
      p.type,
      p.status,
      p.quantity,
      d.ram,
      d.rom,
      d.battery,
      d.cpu_detail AS chip,
      d.operating_system,
      pr.percent AS discount,
      GROUP_CONCAT(DISTINCT pi.image_url ORDER BY pi.is_main DESC SEPARATOR ',') AS images
    FROM product p
    LEFT JOIN detail_product d ON p.id_product = d.id_product
    LEFT JOIN promotion pr ON p.id_promotion = pr.id_promotion
    LEFT JOIN product_image pi ON p.id_product = pi.id_product
    GROUP BY p.id_product
    LIMIT 20
  `);
  
  return rows;
}

/**
 * Chatbot API
 */
exports.chat = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Missing prompt' });
  }

  try {
    const phones = await getAllPhones();

    // Chuẩn bị dữ liệu với ảnh
    const phonesWithImages = phones.map(p => ({
      id: p.id_product,
      name: p.name,
      price: p.price,
      ram: p.ram,
      rom: p.rom,
      battery: p.battery,
      chip: p.chip,
      operating_system: p.operating_system,
      status: p.status,
      quantity: p.quantity,
      brand: p.brand,
      image: p.images ? p.images.split(',')[0] : null
    }));

    try {
      // Gọi Gemini API
      const modelName = 'gemini-1.5-flash-latest';
      
      const context = `
Bạn là trợ lý bán điện thoại thông minh của SalesPhone.
Dữ liệu sản phẩm:
${JSON.stringify(phonesWithImages.slice(0, 10), null, 2)}

Câu hỏi: ${prompt}

Quy tắc trả lời:
- Trả lời ngắn gọn, thân thiện, tiếng Việt, định dạng HTML
- Mỗi sản phẩm là một card với style đẹp (border:1px solid #e5e7eb; border-radius:12px; padding:16px; margin:12px 0; box-shadow:2px 2px 8px rgba(0,0,0,0.1))
- BẮT BUỘC hiển thị ảnh từ trường "image" bằng <img> (width:100%; max-width:250px; height:180px; object-fit:cover; border-radius:8px; margin-bottom:12px)
- Hiển thị: Tên sản phẩm (<h3> màu #667eea), Giá (màu #ef4444, font-size:18px, font-weight:bold), RAM/ROM, Pin, Chip, HĐH
- QUAN TRỌNG: Hiển thị số lượng tồn kho:
  + Nếu quantity > 0: "📦 Còn [số] sản phẩm" (background:#10b981; color:white; padding:6px 12px; border-radius:6px; display:inline-block)
  + Nếu quantity = 0: "📦 Hết hàng" (background:#ef4444; color:white)
- Khi người dùng hỏi về giá, tồn kho, so sánh sản phẩm → trả lời chi tiết
- Nếu hỏi về thương hiệu (iPhone, Samsung, Xiaomi...) → lọc theo brand
- Layout: Dùng div để hiển thị card đẹp mắt
- Không nói "Tôi là AI", hãy nói "Tôi là trợ lý SalesPhone"
`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{ text: context }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const reply = response.data.candidates[0].content.parts[0].text;

      return res.json({
        reply: reply,
        source: 'gemini',
        model: modelName
      });

    } catch (geminiErr) {
      console.error("❌ GEMINI FAIL:", geminiErr.message);

      // Fallback response
      const fallbackReply = `
<div style="padding:16px;">
  <p>Xin lỗi, tôi đang gặp sự cố. Dưới đây là một số sản phẩm nổi bật:</p>
  ${phonesWithImages.slice(0, 3).map(p => `
    <div style="border:1px solid #e5e7eb; border-radius:12px; padding:16px; margin:12px 0; box-shadow:2px 2px 8px rgba(0,0,0,0.1);">
      ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%; max-width:250px; height:180px; object-fit:cover; border-radius:8px; margin-bottom:12px;"/>` : ''}
      <h3 style="color:#667eea; margin:0 0 8px 0;">${p.name}</h3>
      <p style="color:#ef4444; font-size:18px; font-weight:bold; margin:8px 0;">${Number(p.price).toLocaleString()}₫</p>
      <p style="margin:4px 0;">RAM/ROM: ${p.ram}GB / ${p.rom}GB</p>
      <p style="margin:4px 0;">Pin: ${p.battery}mAh</p>
      <p style="margin:4px 0; padding:6px 12px; background:${p.quantity > 0 ? '#10b981' : '#ef4444'}; color:white; border-radius:6px; display:inline-block;">📦 ${p.quantity > 0 ? `Còn ${p.quantity} sản phẩm` : 'Hết hàng'}</p>
    </div>
  `).join('')}
</div>
`;

      return res.json({
        reply: fallbackReply,
        source: 'fallback',
        error: geminiErr.message
      });
    }

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
