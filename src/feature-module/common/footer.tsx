import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";

const Footer = () => {
  const routes = all_routes;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="footer" style={{ padding: '100px 0' }}>
      <div className="container" data-aos="fade-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to={routes.home}>
          <ImageWithBasePath
            src="assets/img/logo-blanco.png"
            alt="Logo ProAmLinks"
            style={{ maxHeight: '50px' }}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
