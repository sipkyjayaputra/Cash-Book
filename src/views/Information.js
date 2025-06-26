import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import MoodIcon from "@material-ui/icons/Mood";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Header from "../container/Header";
import MenuBar from "../container/MenuBar";
import { db } from "../firebase";
import numeral from "numeral";
import { AuthContext } from "../Auth";

function Information() {
  const { currentUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
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
    let totalDebit = 0;
    let countDebit = 0;
    let totalCredit = 0;
    let countCredit = 0;
    history.forEach((his) => {
      if (his.data.category === 1) {
        totalDebit += parseInt(his.data.amount);
        countDebit += 1;
      } else {
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
    setAvgDebit(totalDebit / countDebit);
    setavgCredit(totalCredit / countCredit);
  }, [history, highDebit, highCredit]);

  return (
    <>
      <Header name={"Information"} />
      <div className="d-flex" style={{ height: "91vh" }}>
        <div className="container py-4">
          <div className="row">
            <div className="col-6 my-4">
              <Link to="/highest-credit" style={{ textDecoration: "none" }}>
                <div className="card shadow-lg" style={{ borderRadius: 10 }}>
                  <div
                    className="card-body shadow-lg text-center text-white py-5"
                    style={{ backgroundColor: "#f75948", borderRadius: 10 }}
                  >
                    <MoodBadIcon style={{ color: "white", fontSize: "15vw" }} />
                    <h5>{numeral(highCredit).format("0,0")}</h5>
                    <p>Highest Credit</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 my-4">
              <Link to="/highest-debit" style={{ textDecoration: "none" }}>
                <div className="card shadow-lg" style={{ borderRadius: 10 }}>
                  <div
                    className="card-body shadow-lg text-center text-white py-5"
                    style={{ backgroundColor: "#3bccaa", borderRadius: 10 }}
                  >
                    <MoodIcon style={{ color: "white", fontSize: "15vw" }} />
                    <h5>{numeral(highDebit).format("0,0")}</h5>
                    <p>Highest Debit</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 my-4">
              <Link to="/average-credit" style={{ textDecoration: "none" }}>
                <div className="card shadow-lg" style={{ borderRadius: 10 }}>
                  <div
                    className="card-body shadow-lg text-center text-white py-5"
                    style={{ backgroundColor: "#FFAA4C", borderRadius: 10 }}
                  >
                    <MoodBadIcon style={{ color: "white", fontSize: "15vw" }} />
                    <h5>{numeral(avgCredit).format("0,0")}</h5>
                    <p>Average Credit</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 my-4">
              <Link to="/average-debit" style={{ textDecoration: "none" }}>
                <div className="card shadow-lg" style={{ borderRadius: 10 }}>
                  <div
                    className="card-body shadow-lg text-center text-white py-5"
                    style={{ backgroundColor: "#5089C6", borderRadius: 10 }}
                  >
                    <MoodIcon style={{ color: "white", fontSize: "15vw" }} />
                    <h5>{numeral(avgDebit).format("0,0")}</h5>
                    <p>Average Debit</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MenuBar name="information" />
    </>
  );
}

export default Information;
