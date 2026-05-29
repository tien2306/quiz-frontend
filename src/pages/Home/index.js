import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegCirclePlay } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
import "./home.scss";

function Home() {
  const state = useSelector((state) => state.loginReducer);

  return (
    <div className="home">
      {/* 1. Tiêu đề chung luôn hiển thị */}
      <div className="home__hero">
        <h1 className="home__title">Nền tảng Trắc nghiệm Frontend</h1>
        <p className="home__desc">
          Đánh giá và đo đạc kiến thức lập trình của bạn với các bài kiểm tra từ
          cơ bản đến nâng cao.
        </p>
      </div>

      {/* 2. Nội dung thay đổi theo trạng thái đăng nhập */}
      {state ? (
        <div className="home__actions grid">
          <Link to="/topics" className="home__card">
            <FaRegCirclePlay className="home__card-icon" />
            <h3 className="home__card-title">Bắt đầu luyện tập</h3>
            <p className="home__card-desc">
              Khám phá các chủ đề HTML, CSS, JS, ReactJS...
            </p>
          </Link>

          <Link to="/answers" className="home__card">
            <GiTrophyCup className="home__card-icon" />
            <h3 className="home__card-title">Lịch sử & Thành tích</h3>
            <p className="home__card-desc">
              Xem lại các bài đã làm và điểm số của bạn.
            </p>
          </Link>
        </div>
      ) : (
        <div className="home__buttons">
          <Link to="/register" className="home__btn home__btn--primary">
            Tham gia ngay
          </Link>
          <Link to="/login" className="home__btn home__btn--outline">
            Tôi đã có tài khoản
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
