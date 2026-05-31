import { Button, Layout, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./layoutDefault.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuSider from "../../components/MenuSiber";
const { Footer, Sider, Content } = Layout;

function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(true);
  const isLogin = useSelector((state) => state.loginReducer);
  const navlinkActive = (e) => {
    // --> console.log(e);
    // nếu thộc tính className của Navlink là một hàm
    // thì tham số hàm đó nhận đc là một object
    return e.isActive ? "menu__link--active" : "menu__link";
  };

  return (
    <>
      <Layout className="layout-default">
        <header className="header">
          <div
            className={
              "header__logo" + (collapsed ? " header__logo--collapsed" : "")
            }
          >
            <span>Quiz</span>
          </div>
          <div className="header__nav">
            <div className="header__nav-left">
              <div
                className="header__collapse"
                onClick={() => setCollapsed(!collapsed)}
              >
                <Tooltip title={collapsed ? "Phóng to" : "Thu nhỏ"}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Tooltip>
              </div>
              <>
                {collapsed && (
                  <div className="menu">
                    <ul>
                      <li>
                        <NavLink className={navlinkActive} to="/">
                          Home
                        </NavLink>
                      </li>
                      {isLogin && (
                        <>
                          <li>
                            <NavLink className={navlinkActive} to="/topics">
                              Topic
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className={navlinkActive} to="/answers">
                              Answers
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </>
            </div>
            <div className="header__nav-right">
              {isLogin ? (
                <Button style={{ marginRight: "10px" }}>
                  <NavLink to="/logout"> Đăng xuất</NavLink>
                </Button>
              ) : (
                <>
                  <div className="button-wrap">
                    <Button>
                      <NavLink to="/login"> Đăng nhập</NavLink>
                    </Button>

                    <Button>
                      {" "}
                      <NavLink to="/register"> Đăng ký</NavLink>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <Layout>
          <Sider
            theme="light"
            className="sider"
            width={200}
            collapsed={collapsed}
          >
            <MenuSider />
          </Sider>
          <Content>
            <Outlet />
          </Content>
        </Layout>
        <Footer className="footer"> Copyright @ 2026 by ptTien</Footer>
      </Layout>
    </>
  );
}

export default LayoutDefault;
