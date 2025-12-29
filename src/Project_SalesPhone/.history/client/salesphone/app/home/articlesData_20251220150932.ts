import slideshow1 from './media/abc.jpg';
import slideshow2 from './media/xyz.jpg';
import slideshow3 from './media/eee.jpg';
import slideshow4 from './media/aaa.jpg';
import slideshow5 from './media/bbb.png';
import slideshow6 from './media/ccc.jpg';
import slideshow7 from './media/ddd.jpg';
import slideshow8 from './media/fff.jpg';

export type Article = {
  id: number;
  title: string;
  slug?: string;
  type: 'news' | 'review' | 'tips' | 'compare' | string;
  image: any;
  date: string;
  excerpt: string;
  content: string;
  like: number;
  cmt: number;
};

export const articles: Article[] = [
  {
    id: 1,
    title: 'iPhone 16 Pro ra mắt – quá nhiều nâng cấp đáng giá',
    slug: 'iphone-16-pro-ra-mat',
    type: 'news',
    image: slideshow3,
    date: '12/11/2024',
    excerpt:
      'Apple chính thức công bố dòng iPhone 16 Pro với chip A18 Pro mạnh mẽ, camera cải tiến và pin lâu hơn.',
    content:
      'Apple vừa ra mắt iPhone 16 Pro với nhiều nâng cấp đáng chú ý: chip A18 Pro cho hiệu năng vượt trội, hệ thống camera cải tiến với khả năng chụp thiếu sáng tốt hơn, và thời lượng pin được cải thiện. Phiên bản Pro còn có nhiều tuỳ chọn bộ nhớ và màu sắc mới. Đây là một bản nâng cấp mạnh mẽ hướng tới người dùng cao cấp và nhiếp ảnh di động.',
    like: 120,
    cmt: 45,
  },
  {
    id: 2,
    title: 'Đánh giá Galaxy Z Fold 6: Smartphone gập tốt nhất 2024',
    slug: 'danh-gia-galaxy-z-fold-6',
    type: 'review',
    image: slideshow2,
    date: '10/10/2024',
    excerpt: 'Galaxy Z Fold 6 mang đến trải nghiệm gập mở mượt mà, hiệu năng mạnh mẽ và camera xuất sắc.',
    content:
      'Galaxy Z Fold 6 tiếp tục là lựa chọn hàng đầu cho mảng smartphone gập với bản lề cải tiến, màn hình lớn sáng hơn và hiệu năng ấn tượng. Trong trải nghiệm thực tế, máy đáp ứng tốt đa nhiệm, chụp ảnh chất lượng và thời lượng pin đủ cho cả ngày làm việc.',
    like: 95,
    cmt: 32,
  },
  {
    id: 3,
    title: '10 mẹo tối ưu pin cho điện thoại Android',
    slug: '10-meo-toi-uu-pin-android',
    type: 'tips',
    image: slideshow4,
    date: '05/09/2024',
    excerpt: 'Tổng hợp các mẹo giúp kéo dài thời lượng pin, tăng hiệu suất sử dụng cho smartphone Android.',
    content:
      'Để tối ưu pin: tắt ứng dụng nền không cần thiết, giảm độ sáng màn hình, sử dụng chế độ tiết kiệm pin khi cần, cập nhật phần mềm, và kiểm tra ứng dụng tiêu thụ pin cao. Áp dụng các mẹo này sẽ giúp thiết bị hoạt động ổn định lâu hơn giữa các lần sạc.',
    like: 156,
    cmt: 28,
  },
  {
    id: 4,
    title: 'So sánh iPhone 15 Pro Max vs Samsung S24 Ultra',
    slug: 'so-sanh-iphone15-s24ultra',
    type: 'compare',
    image: slideshow5,
    date: '01/09/2024',
    excerpt: 'Hai flagship đình đám đối đầu: thiết kế, hiệu năng, camera và giá bán, ai sẽ thắng?',
    content:
      'iPhone 15 Pro Max và Samsung S24 Ultra đều là những lựa chọn hàng đầu. iPhone nổi bật với hệ sinh thái, tối ưu phần mềm và chip mạnh mẽ; trong khi Samsung có màn hình đẹp, cụm camera đa dụng và nhiều tính năng linh hoạt.',
    like: 203,
    cmt: 67,
  },
  {
    id: 5,
    title: 'Xiaomi 14 Ultra - Camera phone đỉnh cao',
    slug: 'xiaomi-14-ultra-camera',
    type: 'review',
    image: slideshow1,
    date: '20/08/2024',
    excerpt: 'Khám phá khả năng chụp ảnh vượt trội và hiệu năng mạnh mẽ của Xiaomi 14 Ultra.',
    content:
      'Xiaomi 14 Ultra trang bị cảm biến lớn và thuật toán xử lý ảnh nâng cao, cho hình ảnh chi tiết và màu sắc tự nhiên. Máy cũng có hiệu năng tốt nhờ chip cao cấp, phù hợp với người dùng yêu thích nhiếp ảnh di động.',
    like: 87,
    cmt: 23,
  },
  {
    id: 6,
    title: 'OPPO Find X7 Pro ra mắt với camera tiềm vọng ấn tượng',
    slug: 'oppo-find-x7-pro',
    type: 'news',
    image: slideshow6,
    date: '15/08/2024',
    excerpt: 'OPPO Find X7 Pro gây chú ý với camera tiềm vọng zoom xa, thiết kế sang trọng và pin lớn.',
    content:
      'Find X7 Pro tập trung vào khả năng zoom quang học với module tiềm vọng, đồng thời giữ được thiết kế mỏng nhẹ và viên pin dung lượng lớn cho người dùng cần di động liên tục.',
    like: 78,
    cmt: 19,
  },
  {
    id: 7,
    title: '5 thủ thuật bảo mật điện thoại bạn nên biết',
    slug: '5-thu-thuat-bao-mat',
    type: 'tips',
    image: slideshow7,
    date: '01/08/2024',
    excerpt: 'Bảo vệ dữ liệu cá nhân và tăng cường an toàn cho smartphone với các thủ thuật đơn giản.',
    content:
      'Kích hoạt mã PIN, cập nhật hệ điều hành thường xuyên, hạn chế cài ứng dụng từ nguồn lạ, sử dụng xác thực hai yếu tố và mã hóa dữ liệu là những bước cơ bản để bảo mật thiết bị.',
    like: 65,
    cmt: 12,
  },
  {
    id: 8,
    title: 'So sánh Realme GT5 Pro và Xiaomi 14',
    slug: 'so-sanh-realme-gt5-xiaomi-14',
    type: 'compare',
    image: slideshow8,
    date: '25/07/2024',
    excerpt: 'Đánh giá chi tiết hai mẫu điện thoại nổi bật về hiệu năng và giá trị sử dụng.',
    content:
      'Cả hai máy đều mạnh về hiệu năng; Realme thường có cấu hình/giá tốt hơn, còn Xiaomi hướng tới trải nghiệm tổng thể và camera.',
    like: 54,
    cmt: 8,
  },
];

export default articles;
