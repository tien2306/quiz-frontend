import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Error404 from "../../pages/Error404";
import { useEffect } from "react";
import { checkLogin } from "../../actions/login";
import { getCookie } from "../../helpers/cookie";

function PrivateRoutes() {
  const state = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(checkLogin(true));
    }
  }, [dispatch]);

  return <>{state ? <Outlet /> : <Error404 />}</>;
}

export default PrivateRoutes;
