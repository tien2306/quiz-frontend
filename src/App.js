import { useDispatch } from "react-redux";
import "./App.css";

import AllRoutes from "./components/Allroute";
import { getCookie } from "./helpers/cookie";
import { checkLogin } from "./actions/login";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(checkLogin(true));
    }
  }, [dispatch]);

  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
