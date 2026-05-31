import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../actions/login";
import "./login.scss";
import { Button } from "antd";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value.trim();
    const password = e.target[1].value.trim();
    setLoading(true);
    const res = await login(email, password);

    if (res.length > 0) {
      //cách 1 để lưu lên cookie
      setCookie("id", res[0].id, 1);
      setCookie("fullName", res[0].fullName, 1);
      setCookie("email", res[0].email, 1);
      setCookie("token", res[0].token, 1);
      //cách 2
      // res.map((u) => {
      //   // console.log(u.id);
      //   const { password, ...userInfo } = u;
      //   console.log(userInfo);
      //   document.cookie = `userInfo=${JSON.stringify(userInfo)}; path=/; max-age=86400`;
      // });

      dispatch(checkLogin(true));
      setLoading(false);
      navigate("/");
      alert("Đăng nhập thành công");
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form__title">Đăng Nhập Quiz</h2>

        <div className="login-form__group">
          <label className="login-form__label">Email</label>
          <input
            type="email"
            className="login-form__input"
            autoComplete="email"
            placeholder="Nhập email của bạn"
            required
          />
        </div>

        <div className="login-form__group">
          <label className="login-form__label">Mật khẩu</label>
          <input
            type="password"
            className="login-form__input"
            autoComplete="current-password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          className="login-form__btn"
          loading={loading}
          block
          size="large"
        >
          Đăng Nhập
        </Button>
      </form>
    </div>
  );
}

export default Login;
