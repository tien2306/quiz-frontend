// import { useDispatch } from "react-redux";
import { checkExist, register } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import "./register.scss";

function Register() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExitsEmail = await checkExist("email", email);

    if (checkExitsEmail.length > 0) {
      alert("Email đã tồn tại");
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };

      const res = await register(options);
      // console.log(options);
      if (res) {
        navigate("/login");
      } else {
        alert("Đăng ký thất bại");
      }
    }
  };
  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-form__title">Đăng Ký Tài Khoản</h2>

        <div className="register-form__group">
          <label className="register-form__label">Họ và tên</label>
          <input
            type="text"
            className="register-form__input"
            placeholder="Nhập họ và tên của bạn"
            required
          />
        </div>

        <div className="register-form__group">
          <label className="register-form__label">Email</label>
          <input
            type="email"
            className="register-form__input"
            autoComplete="email"
            placeholder="Nhập địa chỉ email"
            required
          />
        </div>

        <div className="register-form__group">
          <label className="register-form__label">Mật khẩu</label>
          <input
            type="password"
            className="register-form__input"
            autoComplete="new-password"
            placeholder="Nhập mật khẩu "
            required
          />
        </div>

        <button type="submit" className="register-form__btn">
          Đăng Ký
        </button>
      </form>
    </div>
  );
}

export default Register;
