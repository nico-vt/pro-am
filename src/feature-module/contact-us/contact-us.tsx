
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const ContactUs = () => {
  const route = all_routes;
  return (
    <div>
      <div className="main-wrapper contact-us-page">
        {/* Breadcrumb */}
        <div className="breadcrumb breadcrumb-list mb-0">
          <span className="primary-right-round" />
          <div className="container">
            <h1 className="text-white">Contact US</h1>
            <ul>
              <li>
                <Link to={route.home}>Home</Link>
              </li>
              <li>Contact US</li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content blog-details contact-group">
          <div className="container">
            <h2 className="text-center mb-40">Contact Information</h2>
            <div className="row mb-40">
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details">
                  <i className="feather-mail d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Email Address</h4>
                    <p>
                      <Link to="mailto:info@example.com">Info@example.com</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details">
                  <i className="feather-phone-call d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Phone Number</h4>
                    <p>+1 8164 164654</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details">
                  <i className="feather-map-pin d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Location</h4>
                    <p>3365 Central AvenueTeterboro, NJ 07608</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="google-maps">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8862835683544!2d-73.98256668525309!3d41.93829486962529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0ee3286615b7%3A0x42bfa96cc2ce4381!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2sin!4v1670922579281!5m2!1sen!2sin"
                    height={445}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
          <section className="section dull-bg">
            <div className="container">
              <h2 className="text-center mb-40">
                Reach out to us and let&apos;s smash your inquiries
              </h2>
              <form className="contact-us">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="first-name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first-name"
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="last-name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="last-name"
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="e-mail" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="e-mail"
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Enter Subject"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="comments" className="form-label">
                    Comments
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    rows={3}
                    placeholder="Enter Comments"
                    defaultValue={""}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-secondary d-flex align-items-center"
                >
                  Submit
                  <i className="feather-arrow-right-circle ms-2" />
                </button>
              </form>
            </div>
          </section>
        </div>
        {/* /Page Content */}
      </div>
    </div>
  );
};

export default ContactUs;
