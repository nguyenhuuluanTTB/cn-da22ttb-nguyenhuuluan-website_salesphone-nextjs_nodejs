# 🔐 Hướng Dẫn Bảo Mật API Keys

## ⚠️ CẢNH BÁO: API Key Gemini đã bị lộ!

API key Gemini của bạn đã bị lộ qua Git history. Cần thực hiện ngay:

### 1. 🔄 Tạo API Key Mới (BẮT BUỘC)

1. Truy cập: https://makersuite.google.com/app/apikey
2. **XÓA** API key cũ: `AIzaSyCcRXmPGl1Oxo7N6tjOY59cd1BFvAt6by8`
3. Tạo API key mới
4. Cập nhật vào file `.env` (KHÔNG phải `.env.example`)

### 2. 🗑️ Xóa File Nhạy Cảm Khỏi Git History

```bash
# Di chuyển vào thư mục project
cd "D:\ĐỒ ÁN CHUYÊN NGÀNH\WEB NGUOI DUNG\WEB NGUOI DUNG\Do_An_Chuyen_Nganh_SalesPhone\Project_SalesPhone"

# Xóa toàn bộ thư mục .history khỏi Git (nhưng giữ lại local)
git rm -r --cached .history

# Xóa file .env đã bị commit (nếu có)
git rm --cached server/.env

# Commit thay đổi
git add .gitignore
git commit -m "security: Remove sensitive files and add .history to .gitignore"

# Push lên remote
git push origin main
```

### 3. 📝 Tạo File .env

```bash
# Copy file example
cd server
cp .env.example .env

# Mở .env và điền thông tin THẬT của bạn (API key MỚI)
notepad .env
```

### 4. ✅ Kiểm Tra Trước Khi Commit

Trước mỗi lần commit, chạy lệnh:

```bash
# Kiểm tra xem có file nhạy cảm nào sẽ bị commit không
git status

# Đảm bảo KHÔNG có:
# - .env
# - .history/
# - Bất kỳ file nào chứa API keys
```

## 🛡️ Best Practices

### ✅ LUÔN LÀM:
- Dùng file `.env` cho tất cả API keys và secrets
- Thêm `.env` và `.history` vào `.gitignore`
- Dùng file `.env.example` để hướng dẫn (không chứa giá trị thật)
- Kiểm tra `git status` trước khi commit
- Tạo lại API key mới nếu bị lộ

### ❌ KHÔNG BAO GIỜ:
- Hardcode API keys trong source code
- Commit file `.env` lên Git
- Chia sẻ API keys qua chat, email
- Để thư mục `.history` trong Git

## 📚 Tài Liệu Tham Khảo

- [GitHub - Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Git - git-rm Documentation](https://git-scm.com/docs/git-rm)
- [OWASP - API Security](https://owasp.org/www-project-api-security/)

## 🔍 Kiểm Tra Nhanh

Chạy lệnh này để tìm các API keys có thể bị lộ:

```bash
# Tìm trong Git history
git log --all --full-history --source -- "*/.env*"
git log --all --full-history --source -- "*/.history/*"

# Tìm string "AIzaSy" (Gemini API key pattern)
git grep "AIzaSy" $(git rev-list --all)
```

## ❓ Nếu API Key Đã Bị Push Lên GitHub

1. **Tạo API key mới NGAY LẬP TỨC**
2. Xóa API key cũ
3. Chạy các lệnh ở mục 2 để xóa khỏi history
4. Nếu repository là public, cân nhắc làm private hoặc tạo repo mới
