import { NavLink, Outlet } from "react-router-dom";
import "./layoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
// import { useSelector } from "react-redux";

function LayoutDefault() {
  // cách set lại tên class của navlink
  const navlinkActive = (e) => {
    // --> console.log(e);
    // nếu thộc tính className của Navlink là một hàm
    // thì tham số hàm đó nhận đc là một object
    return e.isActive ? "menu__link--active" : "menu__link";
  };

  const token = getCookie("token");
  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <NavLink to="/">Quiz</NavLink>
          </div>
          <div className="layout-default__divide">
            <div className="menu">
              <ul>
                <li>
                  <NavLink className={navlinkActive} to="/">
                    Home
                  </NavLink>
                  {/*Link - Cho phép chuyển đổi giữa các URL khác nhau mà không cần phải load lại trang 
                (nó tương tự như thẻ <a> trong HTML). */}
                  {/* Navlink - tương tự trên và nó add thêm class active khi url trùng với link của navlink */}
                </li>
                {token && (
                  <>
                    <li>
                      <NavLink className={navlinkActive} to="/topics">
                        Topic
                      </NavLink>
                      {/*Link - Cho phép chuyển đổi giữa các URL khác nhau mà không cần phải load lại trang 
                (nó tương tự như thẻ <a> trong HTML). */}
                      {/* Navlink - tương tự trên và nó add thêm class active khi url trùng với link của navlink */}
                    </li>
                    <li>
                      <NavLink className={navlinkActive} to="/answers">
                        Answers
                      </NavLink>
                      {/*Link - Cho phép chuyển đổi giữa các URL khác nhau mà không cần phải load lại trang 
                (nó tương tự như thẻ <a> trong HTML). */}
                      {/* Navlink - tương tự trên và nó add thêm class active khi url trùng với link của navlink */}
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="layout default__account">
              {token ? (
                <>
                  <NavLink to="/logout"> Đăng xuất</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login"> Đăng nhập</NavLink>
                  <span> | </span>
                  <NavLink to="/register"> Đăng ký</NavLink>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          Copyright @ 2026 by ptTien
        </footer>
      </div>
      <></>
    </>
  );
}

export default LayoutDefault;
