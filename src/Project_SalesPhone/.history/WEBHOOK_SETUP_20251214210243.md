# Hướng dẫn cấu hình GHN Webhook với ngrok

## Bước 1: Cài đặt ngrok
1. Download tại: https://ngrok.com/download
2. Giải nén và chạy

## Bước 2: Expose localhost
```bash
ngrok http 5000
```

Bạn sẽ thấy:
```
Forwarding   https://abc123.ngrok.io -> http://localhost:5000
```

## Bước 3: Cấu hình webhook trên GHN
1. Vào https://5sao.ghn.dev/
2. Cài đặt → Webhook
3. Thêm URL: `https://abc123.ngrok.io/api/order/ghn-webhook`
4. Chọn events: delivered, cancel, return...

## Bước 4: Test
1. Cập nhật trạng thái đơn hàng trên GHN
2. Xem terminal server → Sẽ thấy: "GHN Webhook received: {...}"
3. Check database → status đã được cập nhật!

## ⚠️ Lưu ý:
- Mỗi lần chạy ngrok sẽ có URL khác nhau
- Cần cập nhật URL webhook mỗi lần restart ngrok
- Ngrok free có giới hạn thời gian session
