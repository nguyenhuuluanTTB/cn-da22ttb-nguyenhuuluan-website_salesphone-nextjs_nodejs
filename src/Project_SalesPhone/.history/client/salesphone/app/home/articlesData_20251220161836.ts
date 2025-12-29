// Dữ liệu bài viết mẫu cho trang home và trang chi tiết
import slideshow1 from './media/abc.jpg';
import slideshow2 from './media/xyz.jpg';
import slideshow3 from './media/eee.jpg';
import slideshow4 from './media/aaa.jpg';
import slideshow5 from './media/bbb.png';

export const articles = [
  {
    id: 1,
    image: slideshow3,
    type: 'news',
    title: 'iPhone 16 Pro ra mắt – quá nhiều nâng cấp đáng giá',
    excerpt: 'Apple chính thức công bố dòng iPhone 16 Pro với chip A18 Pro mạnh mẽ...',
    date: '12/11/2024',
    content: `Apple vừa ra mắt iPhone 16 Pro với nhiều nâng cấp đáng chú ý: chip A18 Pro cho hiệu năng vượt trội, hệ thống camera cải tiến với khả năng chụp thiếu sáng tốt hơn, và thời lượng pin được cải thiện. Phiên bản Pro còn có nhiều tuỳ chọn bộ nhớ và màu sắc mới. Đây là một bản nâng cấp mạnh mẽ hướng tới người dùng cao cấp và nhiếp ảnh di động.`,
    like: 120,
    cmt: 45,
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763025730/image_title_review_gultcd.png',
    type: 'review',
    title: 'Galaxy Z Fold 6 - Smartphone gập tốt nhất 2024',
    excerpt: 'Đánh giá chi tiết Galaxy Z Fold 6: thiết kế, hiệu năng, camera và trải nghiệm thực tế.',
    date: '10/11/2024',
    content: `Galaxy Z Fold 6 mang đến trải nghiệm gập mở mượt mà, hiệu năng mạnh mẽ và camera xuất sắc. Đây là lựa chọn hàng đầu cho người yêu thích công nghệ mới và đa nhiệm trên smartphone.`,
    like: 95,
    cmt: 32,
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763027377/TIP_2_rm7sjr.png',
    type: 'tips',
    title: '10 mẹo tối ưu pin cho điện thoại Android',
    excerpt: 'Tổng hợp các mẹo giúp kéo dài thời lượng pin, tăng hiệu suất sử dụng cho smartphone Android.',
    date: '05/11/2024',
    content: `Để tối ưu pin: tắt ứng dụng nền không cần thiết, giảm độ sáng màn hình, sử dụng chế độ tiết kiệm pin khi cần, cập nhật phần mềm, và kiểm tra ứng dụng tiêu thụ pin cao. Áp dụng các mẹo này sẽ giúp thiết bị hoạt động ổn định lâu hơn giữa các lần sạc.`,
    like: 156,
    cmt: 28,
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763026662/ss_amkilv.png',
    type: 'compare',
    title: 'So sánh iPhone 15 Pro Max vs Samsung S24 Ultra',
    excerpt: 'Hai flagship đình đám đối đầu: thiết kế, hiệu năng, camera và giá bán, ai sẽ thắng?',
    date: '01/11/2024',
    content: `iPhone 15 Pro Max và Samsung S24 Ultra đều là những lựa chọn hàng đầu. iPhone nổi bật với hệ sinh thái, tối ưu phần mềm và chip mạnh mẽ; trong khi Samsung có màn hình đẹp, cụm camera đa dụng và nhiều tính năng linh hoạt.`,
    like: 203,
    cmt: 67,
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dnhyyioaf/image/upload/v1763025730/image_title_review_gultcd.png',
    type: 'review',
    title: 'Xiaomi 14 Ultra - Camera phone đỉnh cao',
    excerpt: 'Khám phá khả năng chụp ảnh vượt trội và hiệu năng mạnh mẽ của Xiaomi 14 Ultra.',
    date: '28/10/2024',
    content: `Xiaomi 14 Ultra trang bị cảm biến lớn và thuật toán xử lý ảnh nâng cao, cho hình ảnh chi tiết và màu sắc tự nhiên. Máy cũng có hiệu năng tốt nhờ chip cao cấp, phù hợp với người dùng yêu thích nhiếp ảnh di động.`,
    like: 87,
    cmt: 23,
  },
];

export default articles;
