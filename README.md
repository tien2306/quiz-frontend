# 📝 Nền Tảng Trắc Nghiệm Lập Trình Frontend (Quiz Web App)

Nó chỉ là một ứng dụng web đơn giản hỗ trợ người dùng luyện tập và đánh giá kiến thức lập trình Frontend với các chủ đề cốt lõi như HTML, CSS, JavaScript, ReactJS... Dự án được xây dựng với cấu trúc mã nguồn tối giản, giao diện hiện đại và luồng dữ liệu bảo mật, đồng bộ hóa thời gian thực.

🔗 **Link Trải Nghiệm Trực Tuyến:** https://quiz-frontend-simple.vercel.app/

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

### Frontend
* **Core:** ReactJS (Hooks, Functional Components, React Router DOM)
* **State Management:** Redux (Quản lý trạng thái đăng nhập, đồng bộ re-render giao diện)
* **Styling:** SCSS / SASS (Cấu trúc BEM lồng nhau, giao diện Minimalism dễ nhìn)
* **Icons:** React Icons

### Backend 
* **Database & API:**
*  **Sử dụng API giả lập (Fake API) chạy qua JSON Server để mô phỏng một hệ thống cơ sở dữ liệu thực tế.
*  **Server được deploy độc lập trên nền tảng Cloud Render 

---

## ✨ Các Tính Năng Chính Của Dự Án

### 1. Hệ Thống Xác Thực Người Dùng (Authentication)
* **Đăng ký tài khoản:** Tự động kiểm tra trùng lặp Email trong hệ thống, mã hóa ngẫu nhiên chuỗi bảo mật Token khi tạo mới thành công.
* **Đăng nhập hệ thống:** Xác thực tài khoản trực tuyến. Sau khi đăng nhập thành công, hệ thống tự động lưu trữ thông tin nhận diện (`id`, `fullName`, `email`, `token`) vào **Cookie** với thời gian hết hạn an toàn.
* **Đăng xuất nhanh:** Xóa sạch toàn bộ Cookie hệ thống và lập tức cập nhật trạng thái `isLogin` qua Redux để ép thanh Header re-render chuyển đổi giao diện lập tức không cần F5.

### 2. Quản Lý Chủ Đề Luyện Tập (Topics)
* Hiển thị danh sách các chủ đề công nghệ Frontend phong phú (HTML, CSS, JavaScript, ReactJS...).
* Phân quyền hiển thị: Chỉ những người dùng đã đăng nhập hệ thống và có Token hợp lệ mới có quyền truy cập vào danh sách chủ đề làm bài thi.

### 3. Giao Diện Làm Bài Trắc Nghiệm (Quiz & Redo)
* Tải danh sách câu hỏi ngẫu nhiên tương ứng theo từng ID chủ đề từ Server.
* **Nộp bài làm (Submit):** Hệ thống tự động quét trạng thái các ô `radio input`, tổng hợp mảng câu trả lời gửi về cơ sở dữ liệu.
* **Tính năng Làm lại bài test (Ghi đè kết quả cũ):** Tách biệt logic xử lý thông minh qua phương thức API `PATCH`. Người dùng có thể bấm làm lại chính bài test cũ, hệ thống tự động xóa sạch đáp án cũ trên giao diện hiển thị để làm lại từ đầu và cập nhật đè điểm số mới vào chính ID bài làm đó trên file `database.json`.

### 4. Thống Kê & Xem Lại Lịch Sử Kết Quả (Result & History)
* **Trang kết quả:** Tổng hợp chi tiết và trực quan:
  * Tổng số lượng câu trả lời Đúng / câu trả lời Sai.
  * Tỷ lệ phần trăm chính xác (`%`).
  * Nút chuyển hướng nhanh hỗ trợ quay lại làm lại chủ đề đó ngay lập tức.
* **Trang danh sách lịch sử bài tập (Answers):** Hiển thị bảng tổng hợp toàn bộ các lượt làm bài trong quá khứ của riêng cá nhân tài khoản đó kèm theo điểm số tổng quát.
* **Trang chi tiết kết quả:** Hiển thị lại toàn bộ danh sách câu hỏi của đề thi, tự động khóa (`disabled`) các ô radio để không cho sửa, đồng thời sử dụng các lớp CSS highlight nổi bật để hiển thị trực quan:
  * Màu sắc dành riêng cho đáp án người dùng đã chọn.
  * Màu sắc hiển thị đáp án đúng chuẩn của hệ thống hệ thống.

---

## 🛠️ Cài Đặt Và Chạy Thử Dưới Máy Local (Development)

Nếu muốn khởi chạy dự án này ở máy tính của bạn, đầu tiên hãy chuẩn bị cấu trúc database:

### API:
* **Danh sách user:**
  * `id`: Id của user.
  * `fullName`: Họ tên của user.
  * `email`: Email của user.
  * `password`: Mật khẩu của user.
  * `token`: Để mỗi lần đăng nhập sẽ lưu token vào cookie, để load lại trang không phải đăng nhập lại.
* **Danh sách chủ đề:**
  * `id`: Id chủ đề.
  * `name`: Tên chủ đề.
* **Danh sách câu hỏi:**
  * `id`: Id câu hỏi.
  * `topicId`: Id của chủ đề, để biết câu hỏi này thuộc chủ đề nào.
  * `question`: Nội dung chi tiết cho câu hỏi.
  * `answers`: Danh sách các câu trả lời cho câu hỏi đó.
  * `correctAnswer`: Câu trả lời đúng (Dạng number - là index của mảng answers).
* **Danh sách câu trả lời:**
  * `id`: Id của câu trả lời.
  * `userId`: Id của user đã làm bài này.
  * `topicId`: Id của chủ đề.
  * `answers`: Danh sách câu trả lời.
    * `questionId`: Id câu hỏi (Để truy vấn lại thông tin câu hỏi).
    * `answer`: Câu trả lời mà user đã chọn (Dạng number).

### Khởi chạy Backend (JSON Server)
```bash
cd database
npm install
npm start
```
*Server database local tại cổng tùy bạn chỉnh vd:* `http://localhost:3003/`

Sau đó bạn clone FE về sửa API_DOMAIN của file request.js lại thành `http://localhost:3003/`

### Khởi chạy Frontend (ReactJS)
```bash
cd quiz
npm install
npm start
```
*Giao diện ứng dụng sẽ tự động mở tại địa chỉ:* `http://localhost:3000/`

---
Copyright © 2026 by ptTien. All rights reserved.
