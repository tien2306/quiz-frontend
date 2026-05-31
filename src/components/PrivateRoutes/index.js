import { Outlet } from "react-router-dom";
import Error404 from "../../pages/Error404";
import { useSelector } from "react-redux";

function PrivateRoutes() {
  const state = useSelector((state) => state.loginReducer);

  return <>{state ? <Outlet /> : <Error404 />}</>;
}

export default PrivateRoutes;
