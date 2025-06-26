import React, { useEffect, useState, useContext } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HistoryIcon from "@material-ui/icons/History";
import InfoIcon from "@material-ui/icons/Info";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuBar from "../container/MenuBar";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import numeral from "numeral";
import { AuthContext } from "../Auth";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [highDebit, setHighDebit] = useState(0);
  const [highCredit, setHighCredit] = useState(0);
  const [avgDebit, setAvgDebit] = useState(0);
  const [avgCredit, setavgCredit] = useState(0);

  useEffect(() => {
    db.collection("transactions")
      .where("user", "==", currentUser.uid)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        setHistory(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, [currentUser.uid]);

  useEffect(() => {
    let countBalance = 0;
    let totalDebit = 0;
    let countDebit = 0;
    let totalCredit = 0;
    let countCredit = 0;
    history.forEach((his) => {
      if (his.data.category === 1) {
        countBalance += parseInt(his.data.amount);
        totalDebit += parseInt(his.data.amount);
        countDebit += 1;
      } else {
        countBalance -= parseInt(his.data.amount);
        totalCredit += parseInt(his.data.amount);
        countCredit += 1;
      }
      if (his.data.category === 1 && highDebit < parseInt(his.data.amount)) {
        setHighDebit(his.data.amount);
      }
      if (his.data.category === 2 && highCredit < parseInt(his.data.amount)) {
        setHighCredit(his.data.amount);
      }
    });
    setBalance(countBalance);
    setAvgDebit(totalDebit / countDebit);
    setavgCredit(totalCredit / countCredit);
  }, [history, highDebit, highCredit]);

  return (
    <>
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #5089C6, #035397, #001E6C)",
          width: "100vw",
          height: "24vh",
          position: "absolute",
          zIndex: -20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      ></div>
      <div className="container py-4" style={{ height: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center mb-3 text-white">
          <h4>
            <i>Cash Book</i>
          </h4>
          <div>
            <NotificationsIcon style={{ fontSize: 24 }} className="clickable" />
          </div>
        </div>
        <div className="mb-3 text-white">
          <span>My Balance</span>
          <br />
          <div>
            <sup>Rp</sup>{" "}
            <span style={{ fontSize: 24 }}>
              {numeral(balance).format("0,0")}
            </span>
          </div>
        </div>
        <div>
          <div className="card" style={{ borderRadius: 15 }}>
            <div className="card-body" style={{ borderRadius: 15 }}>
              <div
                className="d-flex align-items-center justify-content-between px-4"
                style={{ color: "#035397" }}
              >
                <Link to="/debit" style={{ textDecoration: "none" }}>
                  <div className="d-flex align-items-center flex-column clickable">
                    <div>
                      <GetAppIcon style={{ fontSize: 30 }} />
                    </div>
                    <span style={{ fontSize: 14 }}>Debit</span>
                  </div>
                </Link>
                <Link to="/credit" style={{ textDecoration: "none" }}>
                  <div className="d-flex align-items-center flex-column clickable">
                    <div>
                      <PublishIcon style={{ fontSize: 30 }} />
                    </div>
                    <span style={{ fontSize: 14 }}>Credit</span>
                  </div>
                </Link>
                <Link to="/history" style={{ textDecoration: "none" }}>
                  <div className="d-flex align-items-center flex-column clickable">
                    <div>
                      <HistoryIcon style={{ fontSize: 30 }} />
                    </div>
                    <span style={{ fontSize: 14 }}>History</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-bottom pb-1">
          <div className="row py-4 px-2">
            <div className="col-3">
              <Link to="/highest-credit" style={{ textDecoration: "none" }}>
                <div
                  className="d-flex align-items-center flex-column clickable"
                  style={{ color: "#f75948" }}
                >
                  <div>
                    <InfoIcon style={{ fontSize: 40 }} />
                  </div>
                  <span style={{ fontSize: 12 }}>
                    <i>Hg Credit</i>
                  </span>
                  <small>{numeral(highCredit).format("0,0")}</small>
                </div>
              </Link>
            </div>
            <div className="col-3">
              <Link to="/highest-debit" style={{ textDecoration: "none" }}>
                <div
                  className="d-flex align-items-center flex-column clickable"
                  style={{ color: "#3bccaa" }}
                >
                  <div>
                    <InfoIcon style={{ fontSize: 40 }} />
                  </div>
                  <span style={{ fontSize: 12 }}>
                    <i>Hg Debit</i>
                  </span>
                  <small>{numeral(highDebit).format("0,0")}</small>
                </div>
              </Link>
            </div>
            <div className="col-3">
              <Link to="/average-credit" style={{ textDecoration: "none" }}>
                <div
                  className="d-flex align-items-center flex-column clickable"
                  style={{ color: "#FFAA4C" }}
                >
                  <div>
                    <InfoIcon style={{ fontSize: 40 }} />
                  </div>
                  <span style={{ fontSize: 12 }}>
                    <i>Avg Credit</i>
                  </span>
                  <small>{numeral(avgCredit).format("0,0")}</small>
                </div>
              </Link>
            </div>
            <div className="col-3">
              <Link to="/average-debit" style={{ textDecoration: "none" }}>
                <div
                  className="d-flex align-items-center flex-column clickable"
                  style={{ color: "#5089C6" }}
                >
                  <div>
                    <InfoIcon style={{ fontSize: 40 }} />
                  </div>
                  <span style={{ fontSize: 12 }}>
                    <i>Avg Debit</i>
                  </span>
                  <small>{numeral(avgDebit).format("0,0")}</small>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-1 mx-2" style={{ marginBottom: 200 }}>
          <h6 style={{ fontWeight: "bold" }} className="active-menu">
            Last History
          </h6>
          <div style={{ maxHeight: "20vh", overflowY: "scroll" }}>
            <table
              className="table"
              style={{ fontSize: 14, fontStyle: "italic" }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {history.map((data, i) => {
                  const date = new Date(
                    data.data.date.seconds * 1000
                  ).getDate();
                  const month = new Date(
                    data.data.date.seconds * 1000
                  ).getMonth();
                  const year = new Date(
                    data.data.date.seconds * 1000
                  ).getFullYear();
                  return (
                    <tr
                      style={{
                        color: data.data.category === 2 ? "#f75948" : "#3bccaa",
                      }}
                      key={data.id}
                    >
                      <td>{`${date}/${month}/${year}`}</td>
                      <td>{data.data.description}</td>
                      <td>{numeral(data.data.amount).format("0,0")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-2">
            <Link
              to="/history"
              className="btn btn-sm text-white"
              style={{ backgroundColor: "#5089C6" }}
            >
              <div
                className="d-flex align-items-center pl-2"
                style={{ fontSize: 12 }}
              >
                Show more <ChevronRightIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <MenuBar name="home" />
    </>
  );
}

export default Home;
