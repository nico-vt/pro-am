import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import LanguageSelector from "./language-selector";


const Header = () => {
  const routes = all_routes;
  const location = useLocation();
  // Funciones del menú comentadas temporalmente
  // const onHandleMobileMenu = () => {
  //   const root = document.getElementsByTagName("html")[0];
  //   root.classList.add("menu-opened");
  // };
  // const onhandleCloseMenu = () => {
  //   const root = document.getElementsByTagName("html")[0];
  //   root.classList.remove("menu-opened");
  // };
  
  // Array de header comentado temporalmente
  /* const header = [
    {
      tittle: "Home",
      showAsTab: false,
      separateRoute: true,
      routes: routes.home,
      hasSubRoute: false,
      showSubRoute: false,
    },
    {
      tittle: "Coaches",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "Coaches Map",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Coaches Map",
              routes: routes.coachesMap,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Coaches Map Sidebar",
              routes: routes.coachesMapSidebar,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Coaches Grid",
          routes: routes.coachesGrid,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Coaches List",
          routes: routes.coachesList,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Coaches Grid Sidebar",
          routes: routes.coachesGridSidebar,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Coaches List Sidebar",
          routes: routes.coachesListSidebar,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Booking",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Book a Court",
              routes: routes.cagedetails,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Book a Coach",
              routes: routes.coachDetails,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Coaches Details",
          routes: routes.coachDetails,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Venue",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Venue List",
              routes: routes.listingList,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Venue Details",
              routes: routes.venueDetails,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Coaches Dashboard",
          routes: routes.coachDashboard,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Coach Courts",
          routes: routes.allCourt,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "List Your Cart",
          routes: routes.addCourt,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Chat",
          routes: routes.coachChat,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
      ],
    },
    {
      tittle: "User",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "User Dashboard",
          routes: routes.userDashboard,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Bookings",
          routes: routes.userBookings,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Chat",
          routes: routes.userChat,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Invoice",
          routes: routes.userInvoice,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Wallet",
          routes: routes.userWallet,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Profile Edit",
          routes: routes.userProfile,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Change Password",
          routes: routes.userSettingPassword,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Other Settings",
          routes: routes.profileOtherSetting,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
      ],
    },
    {
      tittle: "Pages",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "About Us",
          routes: routes.aboutUs,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Our Team",
          routes: routes.ourTeams,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "services",
          routes: routes.services,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "Events",
          routes: routes.events,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "Authentication",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Signup",
              routes: routes.register,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Signin",
              routes: routes.login,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Forgot Password",
              routes: routes.forgotPasssword,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Reset Password",
              routes: routes.changePassword,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
          ],
        },

        {
          menuValue: "Error Page",
          hasSubRoute: true,
          showSubRoute: false,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "404 Error",
              routes: routes.error404,
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        },

        {
          menuValue: "Pricing",
          routes: routes.pricing,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "FAQ",
          routes: routes.faq,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "Gallery",
          routes: routes.gallery,
          hasSubRoute: false,
          showSubRoute: false,
        },

        {
          menuValue: "Testimonials",
          routes: routes.testimonials,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "Terms & Conditions",
          routes: routes.termsCondition,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "Privacy Policy",
          routes: routes.privacyPolicy,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "Maintenance",
          routes: routes.maintenance,
          hasSubRoute: false,
          showSubRoute: false,
        },
        {
          menuValue: "Coming Soon",
          routes: routes.comingSoon,
          hasSubRoute: false,
          showSubRoute: false,
        },
      ],
    },
    {
      tittle: "Blog",
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: "Blog List",
          routes: routes.blogList,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },

        {
          menuValue: "Blog List Sidebar",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Blog List Sidebar Left",
              routes: routes.blogListSidebarLeft,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Blog List Sidebar Right",
              routes: routes.blogListSidebarRight,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Blog Grid",
          routes: routes.blogGrid,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Blog Grid Sidebar",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Blog Grid Sidebar Left",
              routes: routes.blogGridSidebarLeft,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Blog Grid Sidebar Right",
              routes: routes.blogGridSidebarRight,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Blog Detail",
          routes: routes.blogDetails,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
        {
          menuValue: "Blog Detail Sidebar",
          hasSubRoute: true,
          showSubRoute: true,
          showAsTab2: false,
          subMenus: [
            {
              menuValue: "Blog Detail Sidebar Left",
              routes: routes.blogDetailsSidebarLeft,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
            {
              menuValue: "Blog Detail Sidebar Right",
              routes: routes.blogDetailsSidebarRight,
              hasSubRoute: true,
              showSubRoute: true,
              subMenus: [],
            },
          ],
        },
        {
          menuValue: "Blog Carousel",
          routes: routes.blogCarousel,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
      ],
    },
    {
      tittle: "Contact Us",
      showAsTab: false,
      separateRoute: true,
      routes: routes.contactUs,
      hasSubRoute: false,
      showSubRoute: false,
    },
  ]; */
  // const [headerState, setHeaderState] = useState(header);

  const customStyle = {
    backgroundColor: "#3ab9ec",
  };
  // Funciones de expansión de menús comentadas temporalmente
  // const expandSubMenus = (menu: string) => {
  //   sessionStorage.setItem("menuValue", menu);
  
  //   // Update `header` by toggling `showAsTab` for the clicked menu
  //   const updatedHeader = headerState.map((mainMenu: any) => {
  //     if (mainMenu.tittle === menu) {
  //       // Toggle `showAsTab` for the selected `mainMenu`
  //       return { ...mainMenu, showAsTab: !mainMenu.showAsTab };
  //     } else {
  //       // Collapse all other menus
  //       return { ...mainMenu, showAsTab: false };
  //     }
  //   });
  
  //   setHeaderState(updatedHeader); // Update state to trigger re-render
  // };
  // const expandSubMenus2 = (menu: string) => {
  //   sessionStorage.setItem("menuValue2", menu);
  
  //   const updatedHeader = header.map((mainMenu: any) => {
  //     if (mainMenu.menu) {
  //       // Update nested menus if they exist
  //       const updatedMenu = mainMenu.menu.map((resMenu: any) => {
  //         if (resMenu.menuValue === menu) {
  //           // Toggle the `showAsTab` for the selected menu
  //           return {
  //             ...resMenu,
  //             showAsTab2: !resMenu.showAsTab2,
  //           };
  //         } else {
  //           // Collapse all other menus
  //           return {
  //             ...resMenu,
  //             showAsTab2: false,
  //           };
  //         }
  //       });
  
  //       return {
  //         ...mainMenu,
  //         menu: updatedMenu,
  //       };
  //     }
  
  //     return mainMenu;
  //   });
  
  //   // Assuming you're managing `header` in state:
  //   setHeaderState(updatedHeader); // Trigger re-render with the updated structure
  // };
  return (
    <header
      className={
        location.pathname.includes(routes.home)
          ? "header header-trans"
          : "header header-sticky"
      }
      style={customStyle}
    >
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            {/* <Link id="mobile_btn" to="#" onClick={() => onHandleMobileMenu()}>
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </Link> */}
            <Link to={routes.home} className="navbar-brand logo">
              <ImageWithBasePath
                src="assets/img/logo-blanco.png"
                className="img-fluid"
                style={{ maxHeight: '40px' }}
                alt="Logo"
              />
            </Link>
          </div>
          {/* Menú de navegación comentado temporalmente */}
          {/* <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to={routes.home} className="menu-logo">
                <ImageWithBasePath
                  src="assets/img/logo-blanco.png"
                  className="img-fluid"
                  style={{ maxHeight: '40px' }}
                  alt="Logo"
                />
              </Link>
              <Link id="menu_close" onClick={() => onhandleCloseMenu()} className="menu-close" to="#">
                {" "}
                <i className="fas fa-times" />
              </Link>
            </div>
            <ul className="main-nav">
            {headerState.map((mainMenus, mainIndex) => (
              <React.Fragment key={mainIndex}>
                {mainMenus.separateRoute ? (
                  <li
                    key={mainIndex}
                    className={
                      location.pathname.includes(mainMenus.routes || "")
                        ? "active"
                        : ""
                    }
                  >
                    {mainMenus.routes && (
  <Link to={mainMenus.routes}>{mainMenus.tittle}</Link>
)}
                  </li>
                ) : (
                  <li
                    className={`has-submenu ${mainMenus?.menu?.some((item) => item?.routes?.includes(location.pathname)) ? "active" : ""}`}
                  >
                    <a  onClick={()=>expandSubMenus(mainMenus.tittle)}>
                      {mainMenus.tittle}{" "}
                      <i className="fas fa-chevron-down"></i>
                    </a>
                    <ul
                      className={`submenu ${mainMenus.showAsTab} ${mainMenus.showAsTab ? "d-block" : ""}`}
                    >
                      {mainMenus.menu?.map((menu, menuIndex) => (
                        <React.Fragment key={`${mainIndex}-${menuIndex}`}>
                          {menu.hasSubRoute ? (
                            <li
                              key={`${mainIndex}-${menuIndex}`}
                              className={`${menu.hasSubRoute ? "has-submenu" : ""} ${menu?.subMenus?.some((item) => item?.routes?.includes(location.pathname)) ? "active" : ""}`}
                            >
                              <a className ="hideonmob" onClick={()=>{expandSubMenus2(menu.menuValue)}}>{menu.menuValue}</a>
                              <ul
                                className={`submenu showonmob`}
                              >
                                {menu.subMenus?.map((subMenu, subMenuIndex) => (
                                  <li key={`${mainIndex}-${menuIndex}-${subMenuIndex}`}>
                                    <Link to={subMenu.routes}>
                                      {subMenu.menuValue}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ) : (
                            <li
                              key={`${mainIndex}-${menuIndex}`}
                              className={
                                location.pathname.includes(menu.routes || "")
                                  ? "active"
                                  : ""
                              }
                            >
                             {menu.routes && (
   <Link to={menu.routes}>{menu.menuValue}</Link>
)}
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </li>
                )}
              </React.Fragment>
            ))}


            </ul>
          </div> */}
          <ul className="nav header-navbar-rht">
            <li className="nav-item">
              <LanguageSelector />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
