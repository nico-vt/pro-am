import  { useEffect, useState } from "react";
import AllRoutes from "./router/router";
import { useLocation } from "react-router-dom";

const Feature = () => {

  const [_base, setBase] = useState("");
  const [page, setPage] = useState("");
  const [_last, setLast] = useState("");
  const location = useLocation();
  // const currentPath = window.location.pathname;
  useEffect(() => {
    setBase(location.pathname.split("/")[1]);
    setPage(location.pathname.split("/")[2]);
    setLast(location.pathname.split("/")[3]);
  }, [location]);

  return (
    <>
      <div
        className={`main-wrapper
        ${
        page === "add-court" ? "add-court venue-coach-details" : 
        page === "coach-detail" ? "venue-coach-details coach-detail" :
        page === "lesson-timedate" ? "coach lessons" :
        page === "lesson-type" ? "coach lessons" :
        // page === "forgot-password" ? "authendication-pages" :
        // page === "gallery" ? "gallery-page innerpagebg" :
        page === "invoice" ? "invoice-page innerpagebg" :
        page === "venue-details" ? "venue-coach-details" : ""
      }`
      }
      >
        <AllRoutes />
      </div>
    </>
  );
};

export default Feature;
