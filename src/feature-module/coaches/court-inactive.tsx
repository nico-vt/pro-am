import  { useState } from "react";
import { all_routes } from "../router/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { inactiveCourt } from "../../core/data/json/inactive_court";
import type { inactiveCourts } from "../../core/data/interface/model";

const InactiveCourt = () => {
  const routes = all_routes;
  const [searchInput, setSearchInput] = useState("");
  const filteredData = inactiveCourt.filter((datas) => {
    const values = Object.values(datas).map((value) =>
      value.toString().toLowerCase()
    );
    return values.some((value) => value.includes(searchInput.toLowerCase()));
  });
  const [selectedSort, setSelectedSort] = useState();
  const sortOptions = [{ name: "Relevance" }, { name: "Price" }];

  const [selectedTimeframe, setSelectedTimeframe] = useState();
  const timeframeOptions = [
    { name: 'This Week' },
    { name: 'One Day' },
  ];


  const courtNameRender = (res: inactiveCourts) => {
    return (
      <h2 className="table-avatar">
        <Link to="#" className="avatar avatar-sm  flex-shrink-0">
          <ImageWithBasePath className="avatar-img" src={res.img} alt="User" />
        </Link>
        <span className="table-head-name flex-grow-1">
          <Link to="#">{res.courtName}</Link>
          <span>{res.courtNo}</span>
        </span>
      </h2>
    );
  };
  const actionRender = () => {
    return (
      <div className="dropdown dropdown-action table-drop-action">
        <Link
          to="#"
          className="action-icon dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-h" />
        </Link>
        <div className="dropdown-menu dropdown-menu-end">
          <Link className="dropdown-item" to="#">
            <i className="feather-edit" />
            Edit
          </Link>
          <Link className="dropdown-item" to="#">
            <i className="feather-trash" />
            Delete
          </Link>
        </div>
      </div>
    );
  };
  const detailsRender = (res: inactiveCourts) => {
    return (
      <Link to="#">
        <i className="feather-eye" />
        {res.details}
      </Link>
    );
  };
  const Render = (res: inactiveCourts) => {
    return (
      <div className="interset-btn">
        <div className="status-toggle d-inline-flex align-items-center">
          <input type="checkbox" id="status_1" className="check" />
          <label htmlFor="status_1" className="checktoggle">
            {res.status}
          </label>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        {/* Breadcrumb */}
        <section className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Courts</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Courts</li>
            </ul>
          </div>
        </section>
        {/* /Breadcrumb */}
        {/* Dashboard Menu */}
        <div className="dashboard-section coach-dash-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-menu coaurt-menu-dash">
                <ul>
                  <li>
                    <Link to={routes.coachDashboard}>
                      <ImageWithBasePath
                        src="assets/img/icons/dashboard-icon.svg"
                        alt="Icon"
                      />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.allCourt} className="active">
                      <ImageWithBasePath
                        src="assets/img/icons/court-icon.svg"
                        alt="Icon"
                      />
                      <span> Courts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.coachRequest}>
                      <ImageWithBasePath
                        src="assets/img/icons/request-icon.svg"
                        alt="Icon"
                      />
                      <span>Requests</span>
                      <span className="court-notify">03</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.coachBooking}>
                      <ImageWithBasePath
                        src="assets/img/icons/booking-icon.svg"
                        alt="Icon"
                      />
                      <span>Bookings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.coachChat}>
                      <ImageWithBasePath
                        src="assets/img/icons/chat-icon.svg"
                        alt="Icon"
                      />
                      <span>Chat</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.coachEarning}>
                      <ImageWithBasePath
                        src="assets/img/icons/invoice-icon.svg"
                        alt="Icon"
                      />
                      <span>Earnings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.coachWallet}>
                      <ImageWithBasePath
                        src="assets/img/icons/wallet-icon.svg"
                        alt="Icon"
                      />
                      <span>Wallet</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.coachProfile}>
                      <ImageWithBasePath
                        src="assets/img/icons/profile-icon.svg"
                        alt="Icon"
                      />
                      <span>Profile Setting</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* /Dashboard Menu */}
        {/* Page Content */}
        <div className="content court-bg">
          <div className="container">
            {/* Sort By */}
            <div className="row">
              <div className="col-lg-12">
                <div className="sortby-section court-sortby-section">
                  <div className="sorting-info">
                    <div className="row d-flex align-items-center">
                      <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
                        <div className="coach-court-list">
                          <ul className="nav">
                            <li>
                              <Link to={routes.allCourt}>All Courts</Link>
                            </li>
                            <li>
                              <Link to={routes.activeCourt}>Active Courts</Link>
                            </li>
                            <li>
                              <Link to={routes.inactiveCourt} className="active">
                                Inactive Courts
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
                        <div className="sortby-filter-group court-sortby">
                          <div className="sortbyset week-bg">
                            <div className="sorting-select">
                            <Dropdown
                              value={selectedTimeframe}
                              onChange={(e) => setSelectedTimeframe(e.value)}
                              options={timeframeOptions}
                              optionLabel="name"
                              placeholder="This Week"
                              className="select custom-select-list week-select"
                            />
                            </div>
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
            <div className="row">
              <div className="col-sm-12">
                <div className="court-tab-content">
                  <div className="card card-tableset">
                    <div className="card-body">
                      <div className="coache-head-blk">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="court-table-head">
                              <h4>Courts</h4>
                              <p>
                                Get timely updates on inactive badminton courts
                                to stay informed.
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="dataTables_filter">
                              <label>
                                <input
                                  type="text"
                                  value={searchInput}
                                  onChange={(e) =>
                                    setSearchInput(e.target.value)
                                  }
                                  placeholder="Search"
                                  className="form-control"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <DataTable value={filteredData}
                          className="table datatable"
                          // value={data}
                          paginator
                          rows={10}
                          rowsPerPageOptions={[10, 25, 50]}
                          currentPageReportTemplate="{first}"
                        >
                          <Column
                            sortable
                            field="courtName"
                            body={courtNameRender}
                            header="Court Name"
                          ></Column>
                          <Column
                            sortable
                            field="location"
                            header="Location"
                          ></Column>
                          <Column
                            sortable
                            field="amount"
                            header="Amount"
                          ></Column>
                          <Column
                            sortable
                            field="maxGuest"
                            header="Max Guest"
                          ></Column>
                          <Column
                            sortable
                            field="additionalGuests"
                            header="Additional Guests"
                          ></Column>
                          <Column
                            sortable
                            field="addedOn"
                            header="Added On"
                          ></Column>
                          <Column
                            sortable
                            field="details"
                            header="Details"
                            className="text-pink view-detail-pink"
                            body={detailsRender}
                          ></Column>
                          <Column
                            sortable
                            field="status"
                            header="Status"
                            body={Render}
                            className="table-inset-btn"
                          ></Column>
                          <Column body={actionRender} header="Action"></Column>
                        </DataTable>
                      </div>
                    </div>
                  </div>
                  <div className="tab-footer">
                    <div className="row">
                      <div className="col-md-6">
                        <div id="tablelength" />
                      </div>
                      <div className="col-md-6">
                        <div id="tablepage" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </div>
  );
};

export default InactiveCourt;
