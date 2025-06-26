import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

function Header(props) {
  const { name, arrowBack } = props;
  return (
    <div
      style={{
        backgroundColor: "#035397",
        width: "100vw",
        height: "9vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="container py-4">
        <div className="d-flex align-items-center text-white">
          {arrowBack ? (
            <Link to="/home" className="pr-3">
              <ArrowBackIcon className="text-white" />
            </Link>
          ) : (
            ""
          )}
          <div>
            <span className="py-auto my-auto" style={{ fontWeight: "bold" }}>
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
