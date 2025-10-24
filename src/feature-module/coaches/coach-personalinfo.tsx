
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const CoachPersonalInfo = () => {
  const routes = all_routes;
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <section className="breadcrumb mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Book A Coach</h1>
            <ul>
              <li>
                <Link to={routes.home}>Home</Link>
              </li>
              <li>Book A Coach</li>
            </ul>
          </div>
        </section>
        {/* /Breadcrumb */}
        <section className="booking-steps py-30">
          <div className="container">
            <ul className="d-xl-flex justify-content-center align-items-center">
              <li>
                <h5>
                  <Link to={routes.coachDetail}>
                    <span>1</span>Type of Booking
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={routes.coachTimeDate}>
                    <span>2</span>Time &amp; Date
                  </Link>
                </h5>
              </li>
              <li className="active">
                <h5>
                  <Link to={routes.coachPersonalInfo}>
                    <span>3</span>Personal Information
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={routes.coachOrederConfirm}>
                    <span>4</span>Order Confirmation
                  </Link>
                </h5>
              </li>
              <li>
                <h5>
                  <Link to={routes.coachPayment}>
                    <span>5</span>Payment
                  </Link>
                </h5>
              </li>
            </ul>
          </div>
        </section>
        {/* Page Content */}
        <div className="content">
          <div className="container">
            <section className="mb-40">
              <div className="text-center mb-40">
                <h3 className="mb-1">Personal Information</h3>
                <p className="sub-title">
                  Ensure accurate and complete information for a smooth booking
                  process.
                </p>
              </div>
              <div className="card">
                <h3 className="border-bottom">Enter Details</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phonenumber"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Your Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter Address"
                    />
                  </div>
                  <div>
                    <label htmlFor="comments" className="form-label">
                      Details
                    </label>
                    <textarea
                      className="form-control"
                      id="comments"
                      rows={3}
                      placeholder="Enter Comments"
                      defaultValue={""}
                    />
                  </div>
                </form>
              </div>
            </section>
            <div className="text-center btn-row">
              <Link
                className="btn btn-primary me-3 btn-icon"
                to={routes.coachTimeDate}
              >
                <i className="feather-arrow-left-circle me-1" /> Back
              </Link>
              <Link
                className="btn btn-secondary btn-icon"
                to={routes.coachOrederConfirm}
              >
                Next <i className="feather-arrow-right-circle ms-1" />
              </Link>
            </div>
          </div>
          {/* /Container */}
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default CoachPersonalInfo;
