/* eslint-disable */
import  { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
const data = [
  {
    id: 1,
    doc_name: "Audi A6 1.8 TFSI 201",
    address: "Alabama, USA",
    amount: "$350",
    lat: 53.470692,
    lng: -2.220328,
    icons: "default",
    total_review: "Fixed",
  },
  {
    id: 2,
    doc_name: "Amsterdam",
    address: "Newyork, USA",
    amount: "$50",
    lat: 53.469189,
    lng: -2.199262,
    icons: "icon2",
    total_review: "Fixed",
  },
  {
    id: 3,
    doc_name: "Fresh organic herbs",
    address: "Georgia, USA",
    amount: "$100",
    lat: 53.468665,
    lng: -2.189269,
    icons: "icon3",
    total_review: "Fixed",
  },
  {
    id: 4,
    doc_name: "Light Wool Navy Blazer",
    address: "Louisiana, USA",
    amount: "$150",
    lat: 53.463894,
    lng: -2.17788,
    icons: "icon4",
    total_review: "Fixed",
  },
  {
    id: 5,
    doc_name: "Easy Ways To Learn",
    address: "Michigan, USA",
    amount: "$50",
    lat: 53.460359,
    lng: -2.210394,
    icons: "icon7",
    total_review: "Fixed",
  },
  {
    id: 6,
    doc_name: "Joyful dog",
    address: "Texas, USA",
    amount: "$100",
    lat: 53.463906,
    lng: -2.213271,
    icons: "icon5",
    total_review: "Fixed",
  },
  {
    id: 7,
    doc_name: "Apple iPhone 6 16GB 4G LTE",
    address: "Kansas, USA",
    amount: "$450",
    lat: 53.468974,
    lng: -2.210661,
    icons: "icon6",
    total_review: "Fixed",
  },
];

const ShowDetails = (object:any) => {
  // console.log(object, "obj");
  return (
    <div
      className="profile-widget"
      style={{
        width: 276,
        background: `url(${object.image})`,
        position: "relative",
        padding: "90px 0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "inline-block",
        borderRadius: 10,
      }}
    >
      <div className="pro-content">
        <h3 className="title">
          <Link to="#"> {object.doc_name} </Link>
        </h3>

        <ul className="available-info">
          <li className="mapaddress">
            <i className="fas fa-map-marker-alt me-2" /> {object.address}{" "}
          </li>

          <li className="map-amount">
            {object.amount}
            <span className="d-inline-block average-rating">
              {" "}
              ({object.total_review})
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ShowMap = () => {

  const [list, setList] = useState<any>([]);
  const [selectIndex, setSelectIndex] = useState(null);

  useEffect(() => {
    setList(data);
  }, []);
  // eslint-disable-next-line react/prop-types
  const AnyReactComponent = ({  icon, currentIndex, object }:any) => (
    <div style={{ color: "white" }}>
      {currentIndex == selectIndex && ShowDetails(object)}
      <img onClick={() => setSelectIndex(currentIndex)} src={icon} alt="" />
    </div>
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCj51aGIAt-Yue3rjWoYz1FZYq8wB6jCIY" }}
        defaultCenter={{ lat: 53.470692, lng: -2.220328 }}
        defaultZoom={11}
      >
        {list?.length > 0 &&
          list.map((obj:any, index:any) => (
            // eslint-disable-next-line react/jsx-key
            <AnyReactComponent
              lat={obj.lat}
              lng={obj.lng}
              // text={index + "*"}
              icon={obj.icon2}
              currentIndex={index}
              object={obj}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default ShowMap;
