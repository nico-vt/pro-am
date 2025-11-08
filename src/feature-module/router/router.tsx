
import { publicRoutes, withoutHeaderRoutes } from "./router.link";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";
import Home from "../home/home";

const AllRoutes = () => {
  const HeaderLayout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <Loader/> */}
    </>
  );

  return (
    <>
      <Routes>
        <Route  element={<HeaderLayout />}>
          <Route path="/home" element={<Home />} />
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
          {withoutHeaderRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
      </Routes>
    </>
  );
};
export default AllRoutes;
