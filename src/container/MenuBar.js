import React from "react";
import HistoryIcon from "@material-ui/icons/History";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

function MenuBar(props) {
  const { name } = props;

  return (
    <div
      className="fixed-bottom shadow-lg pb-4 px-4 border-top mt-5 bg-white"
      style={{ zIndex: 999 }}
    >
      <div className="container" style={{ textDecoration: "none" }}>
        <div className="row">
          <Link
            to="/home"
            style={{ textDecoration: "none" }}
            className={
              "col-3 " + (name === "home" ? "border-top border-info" : "")
            }
          >
            <div
              className={"d-flex align-items-center flex-column clickable pt-2"}
            >
              <HomeIcon
                style={{
                  fontSize: 24,
                  color: name === "home" ? "#001E6C" : "",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: name === "home" ? "#001E6C" : "",
                }}
              >
                Home
              </span>
            </div>
          </Link>
          <Link
            to="/history"
            style={{ textDecoration: "none" }}
            className={
              "col-3 " + (name === "history" ? "border-top border-info" : "")
            }
          >
            <div
              className={"d-flex align-items-center flex-column clickable pt-2"}
            >
              <HistoryIcon
                style={{
                  fontSize: 24,
                  color: name === "history" ? "#001E6C" : "",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: name === "history" ? "#001E6C" : "",
                }}
              >
                History
              </span>
            </div>
          </Link>
          <Link
            to="/information"
            style={{ textDecoration: "none" }}
            className={
              " col-3 " +
              (name === "information" ? "border-top border-info" : "")
            }
          >
            <div
              className={"d-flex align-items-center flex-column clickable pt-2"}
            >
              <InfoIcon
                style={{
                  fontSize: 24,
                  color: name === "information" ? "#001E6C" : "",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: name === "information" ? "#001E6C" : "",
                }}
              >
                Information
              </span>
            </div>
          </Link>
          <Link
            to="/profile"
            style={{ textDecoration: "none" }}
            className={
              "col-3 " + (name === "profile" ? "border-top border-info" : "")
            }
          >
            <div
              className={"d-flex align-items-center flex-column clickable pt-2"}
            >
              <AccountCircleIcon
                style={{
                  fontSize: 24,
                  color: name === "profile" ? "#001E6C" : "",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: name === "profile" ? "#001E6C" : "",
                }}
              >
                Profile
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
