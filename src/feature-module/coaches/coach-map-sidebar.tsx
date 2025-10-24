import  { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Calendar } from "primereact/calendar";
import ShowMap from "../pages/map";
import { Dropdown } from "primereact/dropdown";

const CoachMapSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const lessonOptions = [
    { name: "Lesson 1" },
    { name: "Lesson 2" },
    { name: "Lesson 3" },
  ];
  const [date, setDate] = useState<Date | null>(null);
  const locationOptions = [
    { name: "Select Location" },
    { name: "Location 1" },
    { name: "Location 2" },
  ];
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  const [selectedSort, setSelectedSort] = useState();

  const sortOptions = [{ name: "Relevance" }, { name: "Price" }];
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <section className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Coaches Map Sidebar</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Coaches Map Without Sidebar</li>
            </ul>
          </div>
        </section>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content map-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7">
                <div className="map-list-blk">
                  {/* Sort By */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="sortby-section">
                        <div className="sorting-info">
                          <div className="row d-flex align-items-center">
                            <div className="col-xl-3 col-lg-3 col-sm-12 col-12">
                              <div className="count-search">
                                <p>
                                  <span>150</span> coaches are listed
                                </p>
                              </div>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-sm-12 col-12">
                              <div className="sortby-filter-group">
                                <div className="grid-listview">
                                  <ul className="nav">
                                    <li>
                                      <span>View as</span>
                                    </li>
                                    <li>
                                      <Link to={routes.coachesGridSidebar}>
                                        <ImageWithBasePath
                                          src="assets/img/icons/sort-01.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to={routes.coachesListSidebar}>
                                        <ImageWithBasePath
                                          src="assets/img/icons/sort-02.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to={routes.coachesMapSidebar}
                                        className="active"
                                      >
                                        <ImageWithBasePath
                                          src="assets/img/icons/sort-03.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <div className="sortbyset">
                                  <span className="sortbytitle">Sort By</span>
                                  <div className="sorting-select">
                                    <Dropdown
                                      value={selectedSort}
                                      onChange={(e) => setSelectedSort(e.value)}
                                      options={sortOptions}
                                      optionLabel="name"
                                      placeholder="Relevance"
                                      className="select custom-select-list"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Sort By */}
                  {/* Filter Sidebar */}
                  <div className="sidebar-group">
                    <div className="sidebar-header-left">
                      <button
                        type="button"
                        className="popup-toggle filter-btn"
                        onClick={toggleSidebar}
                      >
                        <span>
                          <i className="fa-solid fa-filter" />
                        </span>
                        Search Filter
                      </button>
                    </div>
                    <div className="sidebar-header-right">
                      <div className="status-toggle switch-toggle">
                        <input
                          id="rating_4"
                          className="check"
                          type="checkbox"
                          
                        />
                        <label
                          htmlFor="rating_4"
                          className="checktoggle checkbox-bg"
                        >
                          checkbox
                        </label>
                        <span>Show Map</span>
                      </div>
                    </div>
                  </div>
                  {/* /Filter Sidebar */}
                  <div className="row justify-content-center">
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-05.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Professional</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[1] ? "selected" : ""}`}
                                  key={1}
                                  onClick={() => handleItemClick(1)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>300 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $250 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>
                                Kevin Anderson
                              </Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Port Alsworth, AK
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Certified Badminton Coach with a deep
                                understanding of the sport&apos;s techniques and
                                strategies.
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>20 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-06.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Rookie</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[2] ? "selected" : ""}`}
                                  key={2}
                                  onClick={() => handleItemClick(2)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $120 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>
                                Angela Roudrigez
                              </Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Guysville, OH
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Experienced coach dedicated to enhancing your
                                badminton skills and unlocking your full
                                potential
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>21 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-07.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Professional</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[3] ? "selected" : ""}`}
                                  key={3}
                                  onClick={() => handleItemClick(3)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $750 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>Evon Raddick</Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Little Rock, AR
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Passionate Badminton Coach unlocking
                                players&apos; potential through strategic
                                gameplay
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>22 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-08.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Intermediate</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[4] ? "selected" : ""}`}
                                  key={4}
                                  onClick={() => handleItemClick(4)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $550 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>
                                Harry Richardson
                              </Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Roanoke, VA
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Passionate Badminton Coach elevating skills and
                                fostering love for the game.
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>23 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-09.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Professional</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[5] ? "selected" : ""}`}
                                  key={5}
                                  onClick={() => handleItemClick(5)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $550 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>Pete Hill</Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Huntsville, AL
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Dedicated Badminton Coach refining players
                                skills and techniques to ignite the game
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>24 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-10.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Intermediate</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[6] ? "selected" : ""}`}
                                  key={6}
                                  onClick={() => handleItemClick(6)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $350 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>Victor Newman</Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Sacramento, CA
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Badminton coach with a passion for improving
                                players&apos; abilities and tactics.
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>24 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-11.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Herman</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[7] ? "selected" : ""}`}
                                  key={7}
                                  onClick={() => handleItemClick(7)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $350 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>
                                Washington, MD
                              </Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Port Alsworth, AK
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Dedicated badminton expert meticulously
                                perfecting techniques for best results
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>24 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-12.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Professional</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[8] ? "selected" : ""}`}
                                  key={8}
                                  onClick={() => handleItemClick(8)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $180 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>Joshua Rogers</Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Port Alsworth, AK
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Detail-oriented badminton enthusiast with a
                                patient coaching approach.
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>24 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    {/* Featured Item */}
                    <div className="col-lg-12">
                      <div className="featured-venues-item">
                        <div className="listing-item listing-item-grid coach-listview">
                          <div className="listing-img">
                            <Link to={routes.coachDetail}>
                              <ImageWithBasePath
                                src="assets/img/featured/featured-13.jpg"
                                alt="Venue"
                              />
                            </Link>
                            <div className="fav-item-venues">
                              <span className="tag tag-blue">Professional</span>
                              <div className="list-reviews coche-star">
                                <Link
                                  to="#"
                                  className={`fav-icon ${selectedItems[9] ? "selected" : ""}`}
                                  key={9}
                                  onClick={() => handleItemClick(9)}
                                >
                                  <i className="feather-heart" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="list-reviews near-review near-review-list">
                              <div className="d-flex align-items-center">
                                <span className="rating-bg">4.2</span>
                                <span>80 Reviews</span>
                              </div>
                              <span className="mile-away">
                                <span>From</span> $150 <span>/hr</span>
                              </span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.coachDetail}>Jamal Dean</Link>
                            </h3>
                            <ul className="mb-2">
                              <li>
                                <span>
                                  <i className="feather-map-pin me-2" />
                                  Roseau, MN
                                </span>
                              </li>
                            </ul>
                            <div className="listing-details-group">
                              <p>
                                Meticulous badminton enthusiast with a gentle
                                coaching style
                              </p>
                            </div>
                            <div className="avalbity-review avalbity-review-list">
                              <ul>
                                <li>
                                  <div className="avalibity-date">
                                    <span>
                                      <i className="feather-calendar" />
                                    </span>
                                    <div className="avalibity-datecontent">
                                      <h6>Next Availabilty</h6>
                                      <h5>24 May 2023</h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="profile-coache-list">
                                <li>
                                  <Link
                                    to={routes.coachDetail}
                                    className="btn btn-secondary w-100"
                                  >
                                    <i className="feather-calendar me-2" /> Book
                                    Now
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Featured Item */}
                    <div className="col-12 text-center">
                      <Link to="#" className="btn btn-load">
                        Load More Coaches{" "}
                        <ImageWithBasePath
                          src="assets/img/icons/u_plus-square.svg"
                          className="ms-2"
                          alt="Icon"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 map-right map-top">
                <div id="map" className="map-listing">
                  <ShowMap />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>
      <div
        className={`toggle-sidebar listing-page ${isSidebarOpen ? "open-sidebar" : ""}`}
      >
        <div className="sidebar-layout-filters ">
          <div className="sidebar-header">
            <h2>Filter</h2>
            <Link to="#" className="sidebar-closes" onClick={closeSidebar}>
              <i className="fa-regular fa-circle-xmark" />
            </Link>
          </div>
          <div className="sidebar-body-filter">
            <div className="listing-filter-group listing-item">
              <form
                action="#"
                autoComplete="off"
                className="sidebar-form listing-content"
              >
                {/* Customer */}
                <div className="sidebar-heading">
                  <h3>
                    Advanced <span>Search</span>
                  </h3>
                  <p>
                    <Link to="#">Clear All</Link>
                  </p>
                </div>
                <div className="listing-search">
                  <div className="form-custom">
                    <input
                      type="text"
                      className="form-control"
                      id="member_search1"
                      placeholder="What are you looking for"
                    />
                    <button className="btn">
                      <span>
                        <i className="feather-search" />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="accordion" id="accordionMain1">
                  <div className="card-header-new" id="headingOne">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Lesson type
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample1"
                  >
                    <div className="card-body-chat">
                      <div className="sorting-select">
                        <span>
                          <i className="feather-list" />
                        </span>
                        <Dropdown
                          value={selectedLesson}
                          onChange={(e) => setSelectedLesson(e.value)}
                          options={lessonOptions}
                          optionLabel="name"
                          placeholder="Lesson 1"
                          className="select-bg w-100 list-sidebar-select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Customer */}
                <div className="accordion" id="accordionMain2">
                  <div className="card-header-new" id="headingTwo">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Location
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample2"
                  >
                    <div className="card-body-chat">
                      <div className="sorting-select">
                        <span>
                          <i className="feather-map-pin" />
                        </span>
                        <Dropdown
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.value)}
                          options={locationOptions}
                          optionLabel="name"
                          placeholder="Select Location"
                          className="select-bg w-100 list-sidebar-select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* By Status */}
                <div className="accordion" id="accordionMain3">
                  <div className="card-header-new" id="headingThree">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Radius
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample3"
                  >
                    <div className="card-body-chat">
                      <div className="filter-range">
                        <Slider
                          className="input-range"
                          min={0}
                          max={100}
                          defaultValue={[0, 50]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /By Status */}
                {/* Category */}
                <div className="accordion" id="accordionMain4">
                  <div className="card-header-new" id="headingFour">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="true"
                        aria-controls="collapseFour"
                      >
                        Price Range
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample4"
                  >
                    <div className="card-body-chat range-price">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-custom">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Min Price"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-custom">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Max Price"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Category */}
                {/* Guests */}
                <div className="accordion" id="accordionMain5">
                  <div className="card-header-new" id="headingFive">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="true"
                        aria-controls="collapseFive"
                      >
                        Guests
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseFive"
                    className="collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample5"
                  >
                    <div className="card-body-chat">
                      <div id="checkBoxes5">
                        <div className="selectBox-cont">
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            0-2
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" /> 2-4
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" /> 4-5
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" /> More than 5+
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Guests */}
                {/* Reviews */}
                <div className="accordion" id="accordionMain6">
                  <div className="card-header-new" id="headingSix">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="true"
                        aria-controls="collapseSix"
                      >
                        Reviews
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseSix"
                    className="collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample6"
                  >
                    <div className="card-body-chat">
                      <div id="checkBoxes4">
                        <div className="selectBox-cont">
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled " />
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled " />
                            <i className="fas fa-star filled" />
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled text-warning" />
                            <i className="fas fa-star filled " />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                          </label>
                          <div className="view-content">
                            <div className="viewall-Two">
                              <label className="custom_check w-100">
                                <input type="checkbox" name="username" />
                                <span className="checkmark" />
                                <i className="fas fa-star filled text-warning" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Reviews */}
                {/* Amenities */}
                <div className="accordion" id="accordionMain7">
                  <div className="card-header-new" id="headingSeven">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSeven"
                        aria-expanded="true"
                        aria-controls="collapseSeven"
                      >
                        Availability
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseSeven"
                    className="collapse"
                    aria-labelledby="headingSeven"
                    data-bs-parent="#accordionExample7"
                  >
                    <div className="card-body-chat datepicker-calendar">
                      <div id="checkBoxes7">
                        <div className="selectBox-cont">
                          <div className="card-body">
                            <div
                              id="calendar-doctor"
                              className="calendar-container"
                            >
                              <Calendar
                                value={date}
                                onChange={(e) =>setDate(e.value as Date | null)} 
                                inline
                                showWeek
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Amenities */}
                {/* Amenities */}
                <div className="accordion" id="accordionMain8">
                  <div className="card-header-new" id="headingEight">
                    <h5 className="filter-title">
                      <Link
                        to="#"
                        className="w-100 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEight"
                        aria-expanded="true"
                        aria-controls="collapseEight"
                      >
                        Amenities
                        <span className="accordion-arrow">
                          <i className="fa-solid fa-chevron-down" />
                        </span>
                      </Link>
                    </h5>
                  </div>
                  <div
                    id="collapseEight"
                    className="collapse"
                    aria-labelledby="headingEight"
                    data-bs-parent="#accordionExample8"
                  >
                    <div className="card-body-chat">
                      <div id="checkBoxes8">
                        <div className="selectBox-cont">
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            Waiting Area
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            Waiting Area
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            Clothes
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            Wi-fi
                          </label>
                          <label className="custom_check w-100">
                            <input type="checkbox" name="category" />
                            <span className="checkmark" />
                            Parking
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Amenities */}
                <button
                  type="submit"
                  className="search-btn btn w-100 btn-primary"
                >
                  <span>
                    <i className="feather-search me-2" />
                  </span>
                  Search Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachMapSideBar;
